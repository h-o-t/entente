# entente

![CI](https://github.com/h-o-t/entente/workflows/CI/badge.svg)
![npm version](https://img.shields.io/npm/v/entente)

A convention testing framework for JavaScript/TypeScript.

**This project is heavily under development and APIs are far from stable. Use at
your own risk.**

## What is convention testing?

Convention testing allows you to enforce type and style conventions in your
code base. Think of it as an advanced linter which you author specific tests
for conventions you want in your code base.

For example, let's say you have a convention that each module you create in
your project has a named export of a function named `render`, that takes a
single options argument and returns an object.

An example module's code might look like this:

```js
import h from "h";

export function render({ state }) {
  return h("h1", {}, state.title);
}
```

And you want to make sure all the views in your project follow this pattern. You
could enforce this as a convention test like this:

```js
import { assertSourceFile, createProject, test } from "entente";

const project = createProject("../src/index.js");

const views = project
  .getSourceFiles()
  .filter((sf) => sf.getFilePath().match(/View\.js$/));

for (const view in views) {
  test({
    name: `view conventions - ${view.getFilePath()}`,
    fn() {
      const renderFn = assertSourceFile(view)
        .exports.namedExport("render")
        .length(1)
        .declarations[0].isFunctionLike();
      renderFn.parameters.length(1).paramater(0).isObject().isNotOptional();
      renderFn.return.isObject();
    },
  });
}
```

If any of the assertions made in the test were not true for any files that were
named liked `*View.js` in your project, then an assertion error would be thrown
alerting you to the conventions not being followed in your code.

All forms of testing have their limits, including convention testing. Most
other forms of testing check inputs and outputs and don't actually introspect
the code itself to see how the work is being accomplished.

This presents a challenge of scaling development on a code base, where you
really want to ensure code not only provides the behaviour expected but also
conforms to the patterns you have established. Convention testing solves this
problem.

## How does it work?

In order to make assertions against the code as it is written, we need the
ability to introspect the code. Entente leverages
[ts-morph](https://ts-morph.com), which in turn leverages the
[TypeScript](https://www.typescriptlang.org/) compiler. The TypeScript compiler
can take JavaScript and TypeScript code and transform it into a rich abstract
syntax tree (AST), which ts-morph provides a more usable interface to work with
the generated AST. Entente then provides a simple test harness and an assertion
interface to make it easy to test the conventions in the code.

## Harness

Entente provides a light-weight test harness with two functions. `test()` to
add a test to the test queue, and `run()` which will execute any queued tests
and resolves with the results of the test run.

You do not have to use the test harness provided with Entente. The assertion
API that is included will throw when assertions are not met, meaning that any
sort of test harness that captures thrown errors should work fine as a test
harness for Entente.

### test()

Put at test into the queue.

```ts
test(spec: TestFn | TestSpec): void;
```

The function accepts either a function or an object with the properties `name`
and `fn`. When just a function is passed, the name of the function will be used
as the name of the test, or auto-generated if the function is anonymous. When
the return from a test function is promise-like it will wait to be resolved
before executing the next test in the queue. If the function throws or rejects,
the test will be marked as a failure.

### run()

Execute any queued tests and return a summary of the results.

```ts
run(options?: RunOptions): Promise<RunResult>;
```

The function optionally accepts a set of options, where the only currently
supported option is `silent`, which defaults to `false`. If `silent` is `true`,
`run()` will not log anything itself to the console during the test run.

Once all the queued tests have been run. The function resolves with an array
which contains a result for each test.

## Using with Jest

In order to utilise convention tests with Jest (and most other test harnesses)
you do not need to utilise the included test harness/runner. Only the project
creation and assertion APIs need to be included. For example to test that
every source file has a default export, you would do something like this:

```ts
import { assertSourceFile, createProject } from "entente";

describe("source file has default export", () => {
  const project = createProject("./src/index.js");
  const sourceFiles = project.getSourceFiles();
  for (const sourceFile of sourceFiles) {
    it(`for: ${sourceFile.getFilePath()}`, () => {
      const fn = assertSourceFile(sourceFile).exports.default(
        "the module has a default export"
      );
    });
  }
});
```

## Projects

In order to test your code, you first need to get your code parsed and
transformed into an AST which can be introspected. Entente supports both
JavaScript and TypeScript.

To create a project, you need to import the `createProject()` function:

```js
import { createProject } from "entente";

const project = createProject("../src/index.js");
```

`createProject()` takes a single argument which is the root file of a project,
be it JavaScript or TypeScript. If the project is a TypeScript project (or a
mixed JavaScript/TypeScript project), then you can use the `tsconfig.json` file:

```ts
const project = createProject("../tsconfig.json");
```

`createProject()` returns a ts-morph `Project`, which allows you to get access
to the AST of the source files associated with the project.

### Source files

A source file is the AST derived from a single input file. Usually each source
file is a module, but this depends upon the code you are analysing. To make
assertions against the code, you likely need to gain access to specific
source files. Information on accessing source files from a project is
[documented here](https://ts-morph.com/navigation/getting-source-files).

## Assertions

In order to test your conventions, you will want to make assertions against the
AST, and Entente provides several interfaces that allow you to make those
assertions.

The general concept is that you pass an assertion function a particular type
of AST node, which returns an interface which makes assertions against that node
and provides properties which allow you to "dig" into the node.

The general pattern for the assertions is that properties "navigate" into the
AST returning a specific interface to make assertions against that value, where
as methods actually make an assertion against the node, and will will throw if
the assertion isn't true. If the method doesn't throw, it might return the
same interface again, or it may delve "deeper" into the AST, depending on what
makes the most sense.

A general workflow would be to obtain a reference to a source file and pass that
as an argument to `assertSourceFile()` which would provide an interface where
you can start to make additional assertions. For example:

```js
import { createProject, assertSourceFile, test, run } from "entente";

const project = createProject("../src/index.js");

for (const sf of project.getSourceFiles()) {
  test({
    name: `has default export - ${sf.getFilePath()}`,
    fn() {
      assertSourceFile(sf).exports.default("Expected a default export.");
    },
  });
}

run();
```

This would check that every module in our project has a default export. If any
of them did not, then the test would fail and an error would be logged to the
console.

## Using JavaScript

Entente can determine quite a lot about JavaScript code just from its usage, but
in many cases, certain things might not be statically determinable. Because
Entente uses the TypeScript compiler to get this analysis, the richer the
information provided to the TypeScript compiler, the richer the information that
is available for making assertions and therefore testing conventions.

TypeScript supports a lot of
[JSDoc](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#supported-jsdoc)
to enrich the understanding of the code. Adding supported JSDoc to your
JavaScript code will also seemlessly increase the amount of information
available when testing.

---

License MIT.

Copyright 2020 Kitson P. Kelly. All rights reserved.

import { assert } from "chai";
import { test } from "./harness";

import { assertSourceFile, createProject } from "../src";

test({
  name: "can return import specifiers",
  fn() {
    const project = createProject("./tests/fixtures/imports.ts");
    const sourceFile = project.getSourceFiles()[0];
    assert.deepEqual(assertSourceFile(sourceFile).imports.specifiers, [
      "./mod3",
      "./mod4"
    ]);
  }
});

test({
  name: "can assert import specifiers - string",
  fn() {
    const project = createProject("./tests/fixtures/imports.ts");
    const sourceFile = project.getSourceFiles()[0];
    assertSourceFile(sourceFile)
      .imports.includes("mod")
      .length(2);
  }
});

test({
  name: "can assert import specifiers - regex",
  fn() {
    const project = createProject("./tests/fixtures/imports.ts");
    const sourceFile = project.getSourceFiles()[0];
    assertSourceFile(sourceFile)
      .imports.includes(/\/mod/)
      .length(2);
  }
});

test({
  name: "throw on failed import specifier assertion",
  fn() {
    const project = createProject("./tests/fixtures/imports.ts");
    const sourceFile = project.getSourceFiles()[0];
    assert.throws(
      () => assertSourceFile(sourceFile).imports.includes("bar"),
      `Expected an import to match "bar".`
    );
  }
});

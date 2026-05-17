import { assert, assertEquals, assertThrows } from "@std/assert";
import {
  createProject,
  expectClass,
  expectFunctionLike,
  expectNode,
  expectSourceFile,
  expectType,
} from "../src/index.ts";

Deno.test("expect: polymorphic dispatch — SourceFile", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();
  assert(expectNode(sourceFiles[0]));
});

Deno.test("expect: can use expectClass directly", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFile = project.getSourceFiles()[0];
  const classDecl = sourceFile.getClasses()[0];
  expectClass(classDecl)
    .toBeDefaultExport()
    .toHaveMember("qux")
    .toHaveLength(1);
});

Deno.test("expect: can use expectFunctionLike directly", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFile = project.getSourceFiles()[0];
  const func = sourceFile.getFunctions()[0];
  expectFunctionLike(func).parameters.toHaveLength(0);
});

Deno.test("expect: can use expectType directly", () => {
  const project = createProject("./tests/fixtures/expect_types.ts");
  const sourceFile = project.getSourceFiles()[0];
  const func = sourceFile.getFunctions()[0];
  const returnType = func.getReturnType();
  expectType(returnType).toBeArray();
});

Deno.test("expect: can assert against a source file", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();
  assert(expectSourceFile(sourceFiles[0]));
});

Deno.test("expect: can assert against file path", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();
  expectSourceFile(sourceFiles[0]).toHaveFilePath(/\/fixtures\/exports\.ts$/);
});

Deno.test("expect: can assert against a default export", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();
  const sourceFile = expectSourceFile(sourceFiles[0]);
  sourceFile.exports
    .toHaveDefault()
    .toHaveLength(1)
    .declarations[0].toBeVariableDeclaration();
});

Deno.test("expect: can assert against a named export via string", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();
  const sourceFile = expectSourceFile(sourceFiles[0]);
  sourceFile.exports
    .toHaveNamedExport("bar")
    .toHaveLength(1)
    .declarations[0].toBeFunctionLike();
});

Deno.test("expect: can assert against a named export via regex", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();
  const sourceFile = expectSourceFile(sourceFiles[0]);
  sourceFile.exports
    .toHaveNamedExport(/qu+x/)
    .toHaveLength(1)
    .declarations[0].toBeVariableDeclaration();
});

Deno.test("expect: classes can assert in source file", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  expectSourceFile(sourceFiles[0]).classes.toHaveLength(1);
});

Deno.test("expect: class is default export", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  expectSourceFile(sourceFiles[0]).classes.declarations[0].toBeDefaultExport();
});

Deno.test("expect: class member exists", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  const members = expectSourceFile(
    sourceFiles[0],
  ).classes.declarations[0].toHaveMember("qux");
  members.toHaveLength(1);
});

Deno.test("expect: member is method like", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  const members = expectSourceFile(
    sourceFiles[0],
  ).classes.declarations[0].toHaveMember("qux");
  members.at(0).toBeMethodLike();
});

Deno.test("expect: member is property", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  const members = expectSourceFile(
    sourceFiles[0],
  ).classes.declarations[0].toHaveMember("qux");
  members.at(0).toBeProperty();
});

Deno.test("expect: member is method", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  const members = expectSourceFile(
    sourceFiles[0],
  ).classes.declarations[0].toHaveMember("quux");
  members.at(0).toBeMethod();
});

Deno.test("expect: property initializer", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  const members = expectSourceFile(
    sourceFiles[0],
  ).classes.declarations[0].toHaveMember("qux");
  members.at(0).toBeProperty().toHaveInitializer().toBeFunctionLike();
});

Deno.test("expect: imports specifiers", () => {
  const project = createProject("./tests/fixtures/imports.ts");
  const sourceFile = project.getSourceFiles()[0];
  assertEquals(expectSourceFile(sourceFile).imports.specifiers, [
    "./mod3",
    "./mod4",
  ]);
});

Deno.test("expect: imports include string", () => {
  const project = createProject("./tests/fixtures/imports.ts");
  const sourceFile = project.getSourceFiles()[0];
  expectSourceFile(sourceFile).imports.toInclude("mod").toHaveLength(2);
});

Deno.test("expect: imports include regex", () => {
  const project = createProject("./tests/fixtures/imports.ts");
  const sourceFile = project.getSourceFiles()[0];
  expectSourceFile(sourceFile).imports.toInclude(/\/mod/).toHaveLength(2);
});

Deno.test("expect: throw on failed import assertion", () => {
  const project = createProject("./tests/fixtures/imports.ts");
  const sourceFile = project.getSourceFiles()[0];
  assertThrows(
    () => expectSourceFile(sourceFile).imports.toInclude("bar"),
    Error,
    `Expected an import to match "bar".`,
  );
});

Deno.test("expect: member out of bounds throws", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  const members = expectSourceFile(
    sourceFiles[0],
  ).classes.declarations[0].toHaveMember("qux");
  assertThrows(
    () => members.at(999),
    Error,
    "Expected a member at index 999.",
  );
});

/// <reference lib="deno.ns" />

import { assert, assertEquals, assertThrows } from "@std/assert";
import * as ts from "ts-morph";
import { assertSourceFile, createProject } from "../src/index.ts";

Deno.test("createProject: able to create TS project", () => {
  const project = createProject("./tests/fixtures/ts.ts");
  assert(project instanceof ts.Project);
  const sourceFiles = project.getSourceFiles();
  assertEquals(sourceFiles.length, 2);
});

Deno.test("createProject: able to create JS project", () => {
  const project = createProject("./tests/fixtures/js.js");
  assert(project instanceof ts.Project);
  const sourceFiles = project.getSourceFiles();
  assertEquals(sourceFiles.length, 2);
});

Deno.test("createProject: able to create mixed JS/TS project", () => {
  const project = createProject("./tests/fixtures/mixed.js");
  assert(project instanceof ts.Project);
  const sourceFiles = project.getSourceFiles();
  assertEquals(sourceFiles.length, 2);
});

Deno.test("createProject: able to create from tsconfig.json", () => {
  const project = createProject("./tests/fixtures/tsconfig.json");
  assert(project instanceof ts.Project);
  const sourceFiles = project.getSourceFiles();
  assertEquals(sourceFiles.length, 2);
});

Deno.test("assert: can assert against a source file", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();
  assert(assertSourceFile(sourceFiles[0]));
});

Deno.test("assert: can assert against file path", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();
  assertSourceFile(sourceFiles[0]).filePath(/\/fixtures\/exports\.ts$/);
});

Deno.test("assert: can assert against a default export", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();
  const sourceFile = assertSourceFile(sourceFiles[0]);
  sourceFile.exports
    .default()
    .length(1)
    .declarations[0].isVariableDeclaration();
});

Deno.test("assert: can assert against a named export via string", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();
  const sourceFile = assertSourceFile(sourceFiles[0]);
  sourceFile.exports
    .namedExport("bar")
    .length(1)
    .declarations[0].isFunctionLike();
});

Deno.test("assert: can assert against a named export via regex", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();
  const sourceFile = assertSourceFile(sourceFiles[0]);
  sourceFile.exports
    .namedExport(/qu+x/)
    .length(1)
    .declarations[0].isVariableDeclaration();
});

Deno.test("assert: exports are iterable", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();
  const sourceFile = assertSourceFile(sourceFiles[0]);
  const exports = [...sourceFile.exports];
  assertEquals(exports.length, 6);
});

Deno.test("classes: can assert classes in source file", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  assertSourceFile(sourceFiles[0]).classes.length(1);
});

Deno.test("classes: can assert class is default export", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  assertSourceFile(sourceFiles[0]).classes.declarations[0].isDefaultExport();
});

Deno.test("classes: can assert class member exists", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  const members = assertSourceFile(
    sourceFiles[0],
  ).classes.declarations[0].member("qux");
  assertEquals(members.length, 1);
});

Deno.test("classes: can assert member is method like", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  const members = assertSourceFile(
    sourceFiles[0],
  ).classes.declarations[0].member("qux");
  members[0].isMethodLike();
});

Deno.test("classes: can assert member is property", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  const members = assertSourceFile(
    sourceFiles[0],
  ).classes.declarations[0].member("qux");
  members[0].isProperty();
});

Deno.test("classes: can assert member is method", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  const members = assertSourceFile(
    sourceFiles[0],
  ).classes.declarations[0].member("quux");
  members[0].isMethod();
});

Deno.test("classes: can get property initializer", () => {
  const project = createProject("./tests/fixtures/exportClass.js");
  const sourceFiles = project.getSourceFiles();
  const members = assertSourceFile(
    sourceFiles[0],
  ).classes.declarations[0].member("qux");
  members[0].isProperty().hasInitializer().isFunctionLike();
});

Deno.test("imports: can return import specifiers", () => {
  const project = createProject("./tests/fixtures/imports.ts");
  const sourceFile = project.getSourceFiles()[0];
  assertEquals(assertSourceFile(sourceFile).imports.specifiers, [
    "./mod3",
    "./mod4",
  ]);
});

Deno.test("imports: can assert import specifiers - string", () => {
  const project = createProject("./tests/fixtures/imports.ts");
  const sourceFile = project.getSourceFiles()[0];
  assertSourceFile(sourceFile).imports.includes("mod").length(2);
});

Deno.test("imports: can assert import specifiers - regex", () => {
  const project = createProject("./tests/fixtures/imports.ts");
  const sourceFile = project.getSourceFiles()[0];
  assertSourceFile(sourceFile).imports.includes(/\/mod/).length(2);
});

Deno.test("imports: throw on failed import specifier assertion", () => {
  const project = createProject("./tests/fixtures/imports.ts");
  const sourceFile = project.getSourceFiles()[0];
  assertThrows(
    () => assertSourceFile(sourceFile).imports.includes("bar"),
    Error,
    `Expected an import to match "bar".`,
  );
});

import { assert } from "chai";
import { test } from "./harness";

import { assertSourceFile, createProject } from "../src";

test({
  name: "can assert against a source file",
  fn() {
    const project = createProject("./tests/fixtures/exports.ts");
    const sourceFiles = project.getSourceFiles();
    assert(assertSourceFile(sourceFiles[0]));
  },
});

test({
  name: "can assert against file path",
  fn() {
    const project = createProject("./tests/fixtures/exports.ts");
    const sourceFiles = project.getSourceFiles();
    assertSourceFile(sourceFiles[0]).filePath(/\/fixtures\/exports\.ts$/);
  },
});

test({
  name: "can assert against a default export",
  fn() {
    const project = createProject("./tests/fixtures/exports.ts");
    const sourceFiles = project.getSourceFiles();
    const sourceFile = assertSourceFile(sourceFiles[0]);
    sourceFile.exports
      .default()
      .length(1)
      .declarations[0].isVariableDeclaration();
  },
});

test({
  name: "can assert against a named export via string",
  fn() {
    const project = createProject("./tests/fixtures/exports.ts");
    const sourceFiles = project.getSourceFiles();
    const sourceFile = assertSourceFile(sourceFiles[0]);
    sourceFile.exports
      .namedExport("bar")
      .length(1)
      .declarations[0].isFunctionLike();
  },
});

test({
  name: "can assert against a named export via a regular expression",
  fn() {
    const project = createProject("./tests/fixtures/exports.ts");
    const sourceFiles = project.getSourceFiles();
    const sourceFile = assertSourceFile(sourceFiles[0]);
    sourceFile.exports
      .namedExport(/qu+x/)
      .length(1)
      .declarations[0].isVariableDeclaration();
  },
});

test({
  name: "exports are iterable",
  fn() {
    const project = createProject("./tests/fixtures/exports.ts");
    const sourceFiles = project.getSourceFiles();
    const sourceFile = assertSourceFile(sourceFiles[0]);
    const exports = [...sourceFile.exports];
    assert(exports.length === 6);
  },
});

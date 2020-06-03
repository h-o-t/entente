import { assert } from "chai";
import { test } from "./harness";

import { assertSourceFile, createProject } from "../src";

test({
  name: "can assert classes in source file",
  fn() {
    const project = createProject("./tests/fixtures/exportClass.js");
    const sourceFiles = project.getSourceFiles();
    assertSourceFile(sourceFiles[0]).classes.length(1);
  },
});

test({
  name: "can assert class is default export",
  fn() {
    const project = createProject("./tests/fixtures/exportClass.js");
    const sourceFiles = project.getSourceFiles();
    assertSourceFile(sourceFiles[0]).classes.declarations[0].isDefaultExport();
  },
});

test({
  name: "can assert class member exists",
  fn() {
    const project = createProject("./tests/fixtures/exportClass.js");
    const sourceFiles = project.getSourceFiles();
    const members = assertSourceFile(
      sourceFiles[0]
    ).classes.declarations[0].member("qux");
    assert.lengthOf(members, 1, "should have only one member named 'qux'");
  },
});

test({
  name: "can assert member is method like",
  fn() {
    const project = createProject("./tests/fixtures/exportClass.js");
    const sourceFiles = project.getSourceFiles();
    const members = assertSourceFile(
      sourceFiles[0]
    ).classes.declarations[0].member("qux");
    members[0].isMethodLike();
  },
});

test({
  name: "can assert member is property",
  fn() {
    const project = createProject("./tests/fixtures/exportClass.js");
    const sourceFiles = project.getSourceFiles();
    const members = assertSourceFile(
      sourceFiles[0]
    ).classes.declarations[0].member("qux");
    members[0].isProperty();
  },
});

test({
  name: "can assert member is method",
  fn() {
    const project = createProject("./tests/fixtures/exportClass.js");
    const sourceFiles = project.getSourceFiles();
    const members = assertSourceFile(
      sourceFiles[0]
    ).classes.declarations[0].member("quux");
    members[0].isMethod();
  },
});

test({
  name: "can get property intializer",
  fn() {
    const project = createProject("./tests/fixtures/exportClass.js");
    const sourceFiles = project.getSourceFiles();
    const members = assertSourceFile(
      sourceFiles[0]
    ).classes.declarations[0].member("qux");
    members[0].isProperty().hasInitializer().isFunctionLike();
  },
});

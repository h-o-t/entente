import { assert } from "chai";
import * as ts from "ts-morph";
import { test } from "./harness";
import { createProject } from "../src";

test({
  name: "able to create TS project",
  fn() {
    const project = createProject("./tests/fixtures/ts.ts");
    assert(project instanceof ts.Project);
    const sourceFiles = project.getSourceFiles();
    assert(sourceFiles.length === 2);
  },
});

test({
  name: "able to create JS project",
  fn() {
    const project = createProject("./tests/fixtures/js.js");
    assert(project instanceof ts.Project);
    const sourceFiles = project.getSourceFiles();
    assert(sourceFiles.length === 2);
  },
});

test({
  name: "able to create mixed JS/TS project",
  fn() {
    const project = createProject("./tests/fixtures/mixed.js");
    assert(project instanceof ts.Project);
    const sourceFiles = project.getSourceFiles();
    assert(sourceFiles.length === 2);
  },
});

test({
  name: "able to create from tsconfig.json",
  fn() {
    const project = createProject("./tests/fixtures/tsconfig.json");
    assert(project instanceof ts.Project);
    const sourceFiles = project.getSourceFiles();
    assert(sourceFiles.length === 2);
  },
});

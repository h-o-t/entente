import { assert } from "chai";
import { test } from "./harness";

import { assertSourceFile, createProject } from "../src";

test({
  name: "can assert exported objects with properties",
  fn() {
    const project = createProject("./tests/fixtures/exportClass.js");
    const sourceFiles = project.getSourceFiles();
    const exportA = assertSourceFile(sourceFiles[0]).exports.namedExport("a");
    const objA = exportA.declarations[0]
      .isVariableDeclaration()
      .initializer.isObject();
    assert(objA.property("b").length === 1);
  },
});

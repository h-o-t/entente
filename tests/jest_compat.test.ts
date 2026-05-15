/** Example showing how to use entente with Jest under Deno. */

import { describe, it } from "@jest/globals";
import { assertSourceFile, createProject } from "../src/index.ts";

describe("convention tests with Jest", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();

  for (const sourceFile of sourceFiles) {
    it(`has a default export: ${sourceFile.getFilePath()}`, () => {
      assertSourceFile(sourceFile).exports.default();
    });
  }
});

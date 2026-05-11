// @ts-nocheck: Vitest globals are not available in Deno
/** Example showing how to use entente with Vitest. */

import { describe, it } from "vitest";
import { assertSourceFile, createProject } from "../src/index.ts";

describe("convention tests with Vitest", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();

  for (const sourceFile of sourceFiles) {
    it(`has a default export: ${sourceFile.getFilePath()}`, () => {
      assertSourceFile(sourceFile).exports.default();
    });
  }
});

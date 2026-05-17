import { describe, it } from "vitest";
import { createProject, expectSourceFile } from "../src/index.ts";

describe("convention tests with Vitest (expect style)", () => {
  const project = createProject("./tests/fixtures/exports.ts");
  const sourceFiles = project.getSourceFiles();

  for (const sourceFile of sourceFiles) {
    it(`has a default export: ${sourceFile.getFilePath()}`, () => {
      expectSourceFile(sourceFile).exports.toHaveDefault();
    });
  }
});

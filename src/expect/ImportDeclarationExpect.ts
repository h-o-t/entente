import { ImportDeclaration } from "../nodes/ImportDeclaration.ts";
import { SourceFileExpect } from "./SourceFileExpect.ts";

export class ImportDeclarationExpect {
  constructor(private _inner: ImportDeclaration) {}

  sourceFile(): SourceFileExpect {
    return new SourceFileExpect(this._inner.sourceFile());
  }
}

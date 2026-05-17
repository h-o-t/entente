import { ExportedDeclarationsArray } from "../nodes/ExportedDeclarationArray.ts";
import { ExportedDeclarationExpect } from "./ExportedDeclarationExpect.ts";

export class ExportedDeclarationsArrayExpect {
  constructor(private _inner: ExportedDeclarationsArray) {}

  get declarations(): ExportedDeclarationExpect[] {
    return this._inner.declarations.map((d) => new ExportedDeclarationExpect(d));
  }

  toHaveLength(expected: number, msg?: string): this {
    this._inner.length(expected, msg);
    return this;
  }
}

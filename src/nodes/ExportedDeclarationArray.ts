import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";
import { ExportedDeclaration } from "./ExportedDeclaration";

export class ExportedDeclarationsArray {
  private _declarations?: ExportedDeclaration[];

  constructor(private _exportedDeclarations: ts.ExportedDeclarations[]) {}

  /** The declarations associated with an export statement. */
  get declarations(): ExportedDeclaration[] {
    if (!this._declarations) {
      this._declarations = this._exportedDeclarations.map(
        (ed) => new ExportedDeclaration(ed)
      );
    }
    return this._declarations;
  }

  /** Assert the length (number) of export declarations associated with an
   * export statement. Typically this is 1. */
  length(expected: number, msg = "Unexpected length."): this {
    const actual = this._exportedDeclarations.length;
    if (expected !== actual) {
      throw new AssertionError(
        msg,
        {
          actual,
          expected,
          showDiff: true,
        },
        this.length
      );
    }
    return this;
  }

  *[Symbol.iterator](): IterableIterator<ExportedDeclaration> {
    let idx = 0;
    while (this._exportedDeclarations[idx]) {
      yield new ExportedDeclaration(this._exportedDeclarations[idx]);
      idx++;
    }
  }
}

import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";
import { ExportedDeclarationsArray } from "./ExportedDeclarationArray";

export class Exports {
  constructor(
    private _declarations: ReadonlyMap<string, ts.ExportedDeclarations[]>
  ) {}

  /** Assert there is a default export from the module and return the export
   * declarations related to the default export. */
  default(msg = "No default export."): ExportedDeclarationsArray {
    return this.namedExport("default", msg);
  }

  /**
   * Assert there is a named export that matches the `key` and return the export
   * declarations related to that named export.  When `key` is a regular
   * expression, the first named export to match the `key` is returned.
   *
   * @param key A string or a regular expression to match.
   * @param msg An optional message to associate with the error if the assertion
   *            fails.
   */
  namedExport(
    key: string | RegExp,
    msg = `No export named "${key}".`
  ): ExportedDeclarationsArray {
    let values: ts.ExportedDeclarations[] | undefined;
    if (typeof key === "string") {
      if (!this._declarations.has(key)) {
        throw new AssertionError(
          msg,
          {
            actual: false,
            expected: true,
            showDiff: false
          },
          this.namedExport
        );
      }
      values = this._declarations.get(key)!;
    } else {
      for (const namedExport of this._declarations.keys()) {
        if (namedExport.match(key)) {
          values = this._declarations.get(namedExport);
          break;
        }
      }
      if (!values) {
        throw new AssertionError(
          `No export matches "${key.toString()}".`,
          {
            actual: false,
            expected: true,
            showDiff: false
          },
          this.namedExport
        );
      }
    }
    return new ExportedDeclarationsArray(values);
  }

  *[Symbol.iterator](): IterableIterator<[string, ExportedDeclarationsArray]> {
    for (const [key, value] of this._declarations) {
      yield [key, new ExportedDeclarationsArray(value)];
    }
  }
}

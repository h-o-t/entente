import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";
import { TypeArray } from "./TypeArray";

export class Properties {
  constructor(private _symbols: ts.Symbol[][]) {}

  /** Assert that property exists in the object type.  If true, returns the
   * object properties. */
  has(
    expected: string | RegExp,
    msg = `Expected property to match "${expected}".`
  ): this {
    for (const sa of this._symbols) {
      for (const s of sa) {
        if (s.getName().match(expected)) {
          return this;
        }
      }
    }
    throw new AssertionError(msg, undefined, this.has);
  }

  /**
   * Get the type interfaces for properties that match the `name`.
   *
   * @param name A string or a regular expression.
   */
  getTypes(name: string | RegExp): TypeArray {
    const types: ts.Type[] = [];
    for (const sa of this._symbols) {
      for (const s of sa) {
        if (s.getName().match(name)) {
          types.push(s.getValueDeclarationOrThrow().getType());
        }
      }
    }
    return new TypeArray(types);
  }
}

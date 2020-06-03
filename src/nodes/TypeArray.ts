import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";

export class TypeArray {
  constructor(private _types: ts.Type[]) {}

  /** Assert that there are at least a number of types in the type array. */
  atLeast(expected: number, msg?: string): this {
    const actual = this._types.length;
    if (!(actual >= expected)) {
      throw new AssertionError(
        msg ?? `Expected at least ${expected} type(s), actual is ${actual}.`,
        {
          actual,
          expected,
          showDiff: false
        },
        this.atLeast
      );
    }
    return this;
  }

  /** Assert that every type in the type array is an object type. */
  isObject(msg = "Expected types to be an object."): this {
    if (!this._types.every(t => t.isObject())) {
      throw new AssertionError(
        msg,
        {
          actual: this._types[0].getText(),
          expected: "object",
          showDiff: false
        },
        this.isObject
      );
    }
    return this;
  }

  /** Assert that every type in the type array is a string type. */
  isString(msg = "Expected types to be a string."): this {
    if (!this._types.every(t => t.isString())) {
      throw new AssertionError(
        msg,
        {
          actual: this._types[0].getText(),
          expected: "string",
          showDiff: false
        },
        this.isString
      );
    }
    return this;
  }
}

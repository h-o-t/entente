import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";
import { ParameterDeclaration } from "./ParameterDeclaration";

export class ParameterDeclarationArray {
  constructor(private _parameters: ts.ParameterDeclaration[]) {}

  /** Assert there is a parameter at the given index.  If true, return an
   * interface to the parameter. */
  parameter(
    idx: number,
    msg = `Expected parameter to exist at index ${idx}.`
  ): ParameterDeclaration {
    if (!this._parameters[idx]) {
      throw new AssertionError(
        msg,
        {
          actual: undefined,
          expected: true,
          showDiff: false,
        },
        this.parameter
      );
    }
    return new ParameterDeclaration(this._parameters[idx]);
  }

  /** Assert the length of the number of parameters accepted by the function.
   * If true, return the parameter list. */
  length(expected: number, msg?: string): this {
    const actual = this._parameters.length;
    if (actual !== expected) {
      throw new AssertionError(
        msg ?? `Expected length of ${expected}, actual ${actual}.`,
        {
          actual,
          expected,
          showDiff: false,
        },
        this.length
      );
    }
    return this;
  }

  *[Symbol.iterator](): IterableIterator<ParameterDeclaration> {
    let idx = 0;
    while (this._parameters[idx]) {
      yield new ParameterDeclaration(this._parameters[idx]);
      idx++;
    }
  }
}

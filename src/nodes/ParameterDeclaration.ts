import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";

export class ParameterDeclaration {
  constructor(private _node: ts.ParameterDeclaration) {}

  /** Assert the parameter is an object type. If true, return the parameter. */
  isObject(msg = "Expected parameter accept an object type."): this {
    if (!this._node.getType().isObject()) {
      throw new AssertionError(
        msg,
        {
          actual: this._node.getType().getText(this._node),
          expected: "object",
          showDiff: false,
        },
        this.isObject
      );
    }
    return this;
  }

  /** Assert the parameter is optional.  If true, return the parameter. */
  isOptional(msg = "Expected parameter to be optional."): this {
    if (!this._node.isOptional()) {
      throw new AssertionError(
        msg,
        {
          actual: false,
          expected: true,
          showDiff: false,
        },
        this.isOptional
      );
    }
    return this;
  }

  /** Assert the parameter is not optional. If true, return the parameter. */
  isNotOptional(msg = "Expected parameter to not be optional."): this {
    if (this._node.isOptional()) {
      throw new AssertionError(
        msg,
        {
          actual: true,
          expected: false,
          showDiff: false,
        },
        this.isNotOptional
      );
    }
    return this;
  }
}

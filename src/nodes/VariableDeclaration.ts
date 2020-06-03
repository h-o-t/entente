import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";
import { Expression } from "./Expression";

export class VariableDeclaration {
  constructor(private _node: ts.VariableDeclaration) {}

  /** The initializer (value) of the variable declaration. */
  get initializer(): Expression {
    return new Expression(this._node.getInitializerOrThrow());
  }

  /** Assert that the variable name matches the expected value. */
  name(
    expected: string | RegExp,
    msg = `Expected name to match "${expected}"`
  ): this {
    const actual = this._node.getName();
    if (!actual.match(expected)) {
      throw new AssertionError(
        msg,
        {
          actual,
          expected,
          showDiff: false,
        },
        this.name
      );
    }
    return this;
  }
}

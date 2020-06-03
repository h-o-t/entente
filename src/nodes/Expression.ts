import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";
import { FunctionLikeDeclaration } from "./FunctionLikeDeclaration";

export class Expression {
  constructor(private _node: ts.Expression) {}

  /** Assert the expression is function like, and return the function like
   * declaration if true. */
  isFunctionLike(msg?: string): FunctionLikeDeclaration {
    if (!ts.Node.isFunctionLikeDeclaration(this._node)) {
      const actual = this._node.getKindName();
      throw new AssertionError(
        msg ?? `Expected a function like declaration, actual ${actual}.`,
        {
          actual,
          expected: "FunctionLikeDeclaration",
          showDiff: false
        },
        this.isFunctionLike
      );
    }
    return new FunctionLikeDeclaration(this._node);
  }
}

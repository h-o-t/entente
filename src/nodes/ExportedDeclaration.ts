import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";
import { FunctionLikeDeclaration } from "./FunctionLikeDeclaration";
import { VariableDeclaration } from "./VariableDeclaration";

export class ExportedDeclaration<
  T extends ts.ExportedDeclarations = ts.ExportedDeclarations
> {
  constructor(private _declaration: T) {}

  get declaration(): T {
    return this._declaration;
  }

  /** Assert the export declaration function like. */
  isFunctionLike(msg?: string): FunctionLikeDeclaration {
    if (!ts.Node.isFunctionLikeDeclaration(this._declaration)) {
      const actual = this._declaration.getKindName();
      throw new AssertionError(
        msg ?? `Expected FunctionLikeDeclaration, actual ${actual}.`,
        {
          actual,
          expected: "FunctionLikeDeclaration",
          showDiff: false
        },
        this.isFunctionLike
      );
    }
    return new FunctionLikeDeclaration(this._declaration);
  }

  /** Assert the export declaration is a variable declaration. */
  isVariableDeclaration(msg?: string): VariableDeclaration {
    if (!ts.Node.isVariableDeclaration(this._declaration)) {
      const actual = this._declaration.getKindName();
      throw new AssertionError(
        msg ?? `Expected VariableDeclaration, actual ${actual}.`,
        {
          actual,
          expected: "VariableDeclaration",
          showDiff: false
        },
        this.isVariableDeclaration
      );
    }
    return new VariableDeclaration(this._declaration);
  }
}

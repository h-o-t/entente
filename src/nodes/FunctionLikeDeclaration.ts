import * as ts from "ts-morph";
import { ParameterDeclarationArray } from "./ParameterDeclarationArray";
import { Type } from "./Type";

export class FunctionLikeDeclaration {
  private _parameterDeclarations?: ParameterDeclarationArray;

  constructor(private _node: ts.FunctionLikeDeclaration) {}

  /** The parameters associated with the function like declaration. */
  get parameters(): ParameterDeclarationArray {
    if (!this._parameterDeclarations) {
      this._parameterDeclarations = new ParameterDeclarationArray(
        this._node.getParameters()
      );
    }
    return this._parameterDeclarations;
  }

  /** The return type of the function like declaration. */
  get return(): Type {
    return new Type(this._node.getReturnType());
  }
}

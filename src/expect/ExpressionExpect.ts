import { Expression } from "../nodes/Expression.ts";
import { FunctionLikeDeclarationExpect } from "./FunctionLikeDeclarationExpect.ts";

export class ExpressionExpect {
  constructor(private _inner: Expression) {}

  toBeFunctionLike(msg?: string): FunctionLikeDeclarationExpect {
    return new FunctionLikeDeclarationExpect(this._inner.isFunctionLike(msg));
  }
}

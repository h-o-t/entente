import { FunctionLikeDeclaration } from "../nodes/FunctionLikeDeclaration.ts";
import { ParameterDeclarationArrayExpect } from "./ParameterDeclarationArrayExpect.ts";
import { TypeExpect } from "./TypeExpect.ts";

export class FunctionLikeDeclarationExpect {
  constructor(private _inner: FunctionLikeDeclaration) {}

  get parameters(): ParameterDeclarationArrayExpect {
    return new ParameterDeclarationArrayExpect(this._inner.parameters);
  }

  get return(): TypeExpect {
    return new TypeExpect(this._inner.return);
  }
}

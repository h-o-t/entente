import { ExportedDeclaration } from "../nodes/ExportedDeclaration.ts";
import { FunctionLikeDeclarationExpect } from "./FunctionLikeDeclarationExpect.ts";
import { VariableDeclarationExpect } from "./VariableDeclarationExpect.ts";

export class ExportedDeclarationExpect<
  T extends import("ts-morph").ExportedDeclarations = import("ts-morph").ExportedDeclarations,
> {
  constructor(private _inner: ExportedDeclaration<T>) {}

  get declaration(): T {
    return this._inner.declaration;
  }

  toBeFunctionLike(msg?: string): FunctionLikeDeclarationExpect {
    return new FunctionLikeDeclarationExpect(this._inner.isFunctionLike(msg));
  }

  toBeVariableDeclaration(msg?: string): VariableDeclarationExpect {
    return new VariableDeclarationExpect(this._inner.isVariableDeclaration(msg));
  }
}

import { VariableDeclaration } from "../nodes/VariableDeclaration.ts";
import { ExpressionExpect } from "./ExpressionExpect.ts";

export class VariableDeclarationExpect {
  constructor(private _inner: VariableDeclaration) {}

  get initializer(): ExpressionExpect {
    return new ExpressionExpect(this._inner.initializer);
  }

  toHaveName(expected: string | RegExp, msg?: string): this {
    this._inner.name(expected, msg);
    return this;
  }
}

import { ParameterDeclaration } from "../nodes/ParameterDeclaration.ts";

export class ParameterDeclarationExpect {
  constructor(private _inner: ParameterDeclaration) {}

  toBeObject(msg?: string): this {
    this._inner.isObject(msg);
    return this;
  }

  toBeOptional(msg?: string): this {
    this._inner.isOptional(msg);
    return this;
  }

  toBeRequired(msg?: string): this {
    this._inner.isNotOptional(msg);
    return this;
  }
}

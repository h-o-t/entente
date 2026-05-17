import { Imports } from "../nodes/Imports.ts";
import { ImportDeclarationExpect } from "./ImportDeclarationExpect.ts";

export class ImportsExpect {
  constructor(private _inner: Imports) {}

  get declarations(): ImportDeclarationExpect[] {
    return this._inner.declarations.map((d) => new ImportDeclarationExpect(d));
  }

  get specifiers(): string[] {
    return this._inner.specifiers;
  }

  toInclude(value: string | RegExp, msg?: string): this {
    this._inner.includes(value, msg);
    return this;
  }

  toHaveLength(expected: number, msg?: string): this {
    this._inner.length(expected, msg);
    return this;
  }
}

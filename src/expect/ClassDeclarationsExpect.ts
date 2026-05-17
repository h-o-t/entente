import { ClassDeclarations } from "../nodes/ClassDeclarations.ts";
import { ClassDeclarationExpect } from "./ClassDeclarationExpect.ts";

export class ClassDeclarationsExpect {
  constructor(private _inner: ClassDeclarations) {}

  get declarations(): ClassDeclarationExpect[] {
    return this._inner.declarations.map((d) => new ClassDeclarationExpect(d));
  }

  toIncludeClass(value: string | RegExp, msg?: string): this {
    this._inner.includes(value, msg);
    return this;
  }

  toHaveLength(expected: number, msg?: string): this {
    this._inner.length(expected, msg);
    return this;
  }
}

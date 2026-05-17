import { TypeArray } from "../nodes/TypeArray.ts";

export class TypeArrayExpect {
  constructor(private _inner: TypeArray) {}

  toHaveAtLeast(expected: number, msg?: string): this {
    this._inner.atLeast(expected, msg);
    return this;
  }

  toBeObject(msg?: string): this {
    this._inner.isObject(msg);
    return this;
  }

  toBeString(msg?: string): this {
    this._inner.isString(msg);
    return this;
  }
}

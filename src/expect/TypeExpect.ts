import { Type } from "../nodes/Type.ts";
import { PropertiesExpect } from "./PropertiesExpect.ts";

export class TypeExpect {
  constructor(private _inner: Type) {}

  toBeArray(msg?: string): this {
    this._inner.isArray(msg);
    return this;
  }

  toBeObject(msg?: string): this {
    this._inner.isObject(msg);
    return this;
  }

  get properties(): PropertiesExpect {
    return new PropertiesExpect(this._inner.properties);
  }

  get arrayElementType(): TypeExpect {
    return new TypeExpect(this._inner.arrayElementType);
  }
}

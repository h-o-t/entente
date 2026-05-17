import { Properties } from "../nodes/Properties.ts";
import { TypeArrayExpect } from "./TypeArrayExpect.ts";

export class PropertiesExpect {
  constructor(private _inner: Properties) {}

  toHaveProperty(expected: string | RegExp, msg?: string): this {
    this._inner.has(expected, msg);
    return this;
  }

  getTypes(name: string | RegExp): TypeArrayExpect {
    return new TypeArrayExpect(this._inner.getTypes(name));
  }
}

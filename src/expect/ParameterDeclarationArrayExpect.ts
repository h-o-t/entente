import { ParameterDeclarationArray } from "../nodes/ParameterDeclarationArray.ts";
import { ParameterDeclarationExpect } from "./ParameterDeclarationExpect.ts";

export class ParameterDeclarationArrayExpect {
  constructor(private _inner: ParameterDeclarationArray) {}

  at(idx: number, msg?: string): ParameterDeclarationExpect {
    return new ParameterDeclarationExpect(this._inner.parameter(idx, msg));
  }

  toHaveLength(expected: number, msg?: string): this {
    this._inner.length(expected, msg);
    return this;
  }
}

import { ClassProperty } from "../nodes/ClassProperty.ts";
import { ExpressionExpect } from "./ExpressionExpect.ts";

export class ClassPropertyExpect {
  constructor(private _inner: ClassProperty) {}

  get initializer(): ExpressionExpect | undefined {
    const init = this._inner.initializer;
    return init ? new ExpressionExpect(init) : undefined;
  }

  toHaveInitializer(msg?: string): ExpressionExpect {
    return new ExpressionExpect(this._inner.hasInitializer(msg));
  }
}

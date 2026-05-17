import { ClassMember } from "../nodes/ClassMember.ts";
import { ClassMethodExpect } from "./ClassMethodExpect.ts";
import { ClassPropertyExpect } from "./ClassPropertyExpect.ts";

export class ClassMemberExpect {
  constructor(private _inner: ClassMember) {}

  toBeMethodLike(msg?: string): this {
    this._inner.isMethodLike(msg);
    return this;
  }

  toBeMethod(msg?: string): ClassMethodExpect {
    return new ClassMethodExpect(this._inner.isMethod(msg));
  }

  toBeProperty(msg?: string): ClassPropertyExpect {
    return new ClassPropertyExpect(this._inner.isProperty(msg));
  }
}

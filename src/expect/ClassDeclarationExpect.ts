import { ClassDeclaration } from "../nodes/ClassDeclaration.ts";
import { ClassMembersExpect } from "./ClassMembersExpect.ts";

export class ClassDeclarationExpect {
  constructor(private _inner: ClassDeclaration) {}

  toBeDefaultExport(msg?: string): this {
    this._inner.isDefaultExport(msg);
    return this;
  }

  toBeExported(msg?: string): this {
    this._inner.isExported(msg);
    return this;
  }

  toHaveMember(value: string | RegExp, msg?: string): ClassMembersExpect {
    return new ClassMembersExpect(this._inner.member(value, msg));
  }

  toHaveStaticMember(value: string | RegExp, msg?: string): ClassMembersExpect {
    return new ClassMembersExpect(this._inner.staticMember(value, msg));
  }
}

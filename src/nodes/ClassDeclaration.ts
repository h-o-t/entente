import { AssertionError } from "../assertion_error.ts";
import * as ts from "ts-morph";
import { ClassMember } from "./ClassMember.ts";

export class ClassDeclaration {
  constructor(private _node: ts.ClassDeclaration) {}

  /** Asserts that the class is the default export of the source file. */
  isDefaultExport(msg: string = `Expected class to be the default export.`): this {
    if (!this._node.getExportKeyword() || !this._node.getDefaultKeyword()) {
      throw new AssertionError(msg, undefined, this.isDefaultExport);
    }
    return this;
  }

  /** Asserts that the class is exported from the source file. */
  isExported(msg: string = `Expected class to be exported.`): this {
    if (!this._node.getExportKeyword()) {
      throw new AssertionError(msg, undefined, this.isExported);
    }
    return this;
  }

  /** Asserts that the class has an instance member that matches the supplied
   * value. */
  member(
    value: string | RegExp,
    msg: string = `Expected the class to have a member that matches "${String(value)}".`,
  ): ClassMember[] {
    const includeArray = this._node.getInstanceMembers().filter((im) => {
      const name = im.getName();
      if (!name) {
        return false;
      }
      return typeof value === "string" ? name.includes(value) : name.match(value);
    });
    if (!includeArray.length) {
      throw new AssertionError(msg, undefined, this.member);
    }
    return includeArray.map((im) => new ClassMember(im));
  }

  /** Asserts that the class has an static member that matches the supplied
   * value. */
  staticMember(
    value: string | RegExp,
    msg: string = `Expected the class to have a static member that matches "${
      String(
        value,
      )
    }".`,
  ): ClassMember[] {
    const includeArray = this._node.getStaticMembers().filter((sm) => {
      const name = sm.getName();
      if (!name) {
        return false;
      }
      return typeof value === "string" ? name.includes(value) : name.match(value);
    }) as ts.ClassInstanceMemberTypes[];
    if (!includeArray.length) {
      throw new AssertionError(msg, undefined, this.member);
    }
    return includeArray.map((sm) => new ClassMember(sm));
  }
}

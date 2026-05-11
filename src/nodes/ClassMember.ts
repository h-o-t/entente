import { AssertionError } from "../assertion_error.ts";
import * as ts from "ts-morph";
import { ClassMethod } from "./ClassMethod.ts";
import { ClassProperty } from "./ClassProperty.ts";

export class ClassMember {
  constructor(private _node: ts.ClassInstanceMemberTypes) {}

  /** Asserts that the member is a method, not a property. */
  isMethod(
    msg: string = `Expected class member to be a method, found property.`,
  ): ClassMethod {
    if (!ts.Node.isMethodDeclaration(this._node)) {
      throw new AssertionError(msg, undefined, this.isMethod);
    }
    return new ClassMethod(this._node);
  }

  /** Asserts that the member is method like.  For example properties which are
   * initialized with arrow functions would be method like. */
  isMethodLike(msg: string = `Expected class member to be a method like.`): this {
    if (!ts.Node.isMethodDeclaration(this._node)) {
      let initializer: ts.Expression | undefined;
      if (ts.Node.isParameterDeclaration(this._node)) {
        initializer = this._node.getInitializer();
      } else if (ts.Node.isPropertyDeclaration(this._node)) {
        initializer = this._node.getInitializer();
      }
      if (initializer) {
        if (ts.Node.isFunctionLikeDeclaration(initializer)) {
          return this;
        }
      }
      throw new AssertionError(msg, undefined, this.isMethodLike);
    }
    return this;
  }

  /** Asserts that the member is a property. */
  isProperty(
    msg: string = `Expected class member to be a property, found method.`,
  ): ClassProperty {
    if (ts.Node.isMethodDeclaration(this._node)) {
      throw new AssertionError(msg, undefined, this.isProperty);
    }
    return new ClassProperty(this._node);
  }
}

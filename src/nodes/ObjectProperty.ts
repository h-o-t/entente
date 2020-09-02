import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";
import { Method } from "./Method";
import { Property } from "./Property";

export type ObjectPropertyNode =
  | ts.PropertyAssignment
  | ts.ShorthandPropertyAssignment
  | ts.MethodDeclaration
  | ts.AccessorDeclaration;

export class ObjectProperty {
  constructor(private _node: ObjectPropertyNode) {}

  // isAccessor() {}

  isMethod(
    msg = `Expected class member to be a method, found property.`
  ): Method {
    if (!ts.TypeGuards.isMethodDeclaration(this._node)) {
      throw new AssertionError(msg, undefined, this.isMethod);
    }
    return new Method(this._node);
  }

  isMethodLike(msg = `Expected object property to be a method like.`): this {
    if (!ts.TypeGuards.isMethodDeclaration(this._node)) {
      if (
        ts.TypeGuards.isPropertyAssignment(this._node) ||
        ts.TypeGuards.isShorthandPropertyAssignment(this._node) ||
        ts.TypeGuards.isParameterDeclaration(this._node) ||
        ts.TypeGuards.isPropertyDeclaration(this._node)
      ) {
        const initializer = this._node.getInitializer();
        if (initializer) {
          if (ts.TypeGuards.isFunctionLikeDeclaration(initializer)) {
            return this;
          }
        }
      }
      throw new AssertionError(msg, undefined, this.isMethodLike);
    }
    return this;
  }

  isProperty(
    msg = `Expected object property contain an initialized property.`
  ): Property {
    if (
      ts.TypeGuards.isMethodDeclaration(this._node) ||
      ts.TypeGuards.isGetAccessorDeclaration(this._node) ||
      ts.TypeGuards.isSetAccessorDeclaration(this._node)
    ) {
      throw new AssertionError(msg, undefined, this.isProperty);
    }
    return new Property(this._node);
  }
}

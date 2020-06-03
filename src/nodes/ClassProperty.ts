import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";
import { Expression } from "./Expression";

export class ClassProperty {
  constructor(private _node: ts.ClassInstancePropertyTypes) {}

  /** Provides the initializer for the property if there is one. */
  get initializer(): Expression | undefined {
    let value: ts.Expression | undefined;
    if (ts.TypeGuards.isParameterDeclaration(this._node)) {
      value = this._node.getInitializer();
    } else if (ts.TypeGuards.isPropertyDeclaration(this._node)) {
      value = this._node.getInitializer();
    }
    return value ? new Expression(value) : undefined;
  }

  /** Asserts the property has an inializer and returns the expression.  */
  hasInitializer(msg = "Expected property to have intializer."): Expression {
    const { initializer } = this;
    if (!initializer) {
      throw new AssertionError(msg, undefined, this.hasInitializer);
    }
    return initializer;
  }
}

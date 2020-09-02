import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";
import { ObjectProperty, ObjectPropertyNode } from "./ObjectProperty";

export class ObjectLiteralExpression {
  constructor(private _node: ts.ObjectLiteralExpression) {}

  property(
    value: string | RegExp,
    msg = `Expected the object to have a property that matches "${String(
      value
    )}".`
  ): ObjectProperty[] {
    const includeArray = this._node.getProperties().filter((p) => {
      if (!ts.TypeGuards.isSpreadAssignment(p)) {
        const name = p.getName();
        if (!name) {
          return false;
        }
        return typeof value === "string"
          ? name.includes(value)
          : name.match(value);
      }
      return false;
    }) as ObjectPropertyNode[];
    if (!includeArray.length) {
      throw new AssertionError(msg, undefined, this.property);
    }
    return includeArray.map((p) => new ObjectProperty(p));
  }
}

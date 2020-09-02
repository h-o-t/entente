import * as ts from "ts-morph";
import { Expression } from "./Expression";

export class Property {
  constructor(
    private _node: ts.PropertyAssignment | ts.ShorthandPropertyAssignment
  ) {}

  get initializer(): Expression | undefined {
    const value = this._node.getInitializer();
    return value ? new Expression(value) : undefined;
  }
}

import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";
import { Properties } from "./Properties";

export class Type<T extends ts.ts.Type = ts.ts.Type> {
  private _properties?: Properties;
  private _types: ts.Type[];

  constructor(private _type: ts.Type<T>) {
    this._types = _type.isUnion() ? _type.getUnionTypes() : [_type];
  }

  /** Assert the type is an array type. */
  isArray(msg?: string): this {
    if (!this._types.every((t) => t.isArray())) {
      const actual = this._type.getText();
      throw new AssertionError(
        `Expected an array type, actual "${actual}".` ?? msg,
        {
          actual,
          expected: "Array<any>",
          showDiff: false,
        },
        this.isArray
      );
    }
    return this;
  }

  /** Assert the type is an object type. */
  isObject(msg?: string): this {
    if (!this._types.every((t) => t.isObject())) {
      const actual = this._type.getText();
      throw new AssertionError(
        `Expected an object type, actual "${this._type.getText()}".` ?? msg,
        {
          actual,
          expected: "object",
          showDiff: false,
        },
        this.isObject
      );
    }
    return this;
  }

  /** Properties associated with the type. */
  get properties(): Properties {
    if (!this._properties) {
      this._properties = new Properties(
        this._types.map((t) => t.getProperties())
      );
    }
    return this._properties;
  }

  /** The type associated with the array element.  If the type is not an array
   * type, accessing this property will throw. */
  get arrayElementType(): Type {
    return new Type(this._type.getArrayElementTypeOrThrow());
  }
}

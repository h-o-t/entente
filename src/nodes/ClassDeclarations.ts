import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";
import { ClassDeclaration } from "./ClassDeclaration";

export class ClassDeclarations {
  constructor(private _declarations: ts.ClassDeclaration[]) {}

  /** The declarations of classes as an array. */
  get declarations(): ClassDeclaration[] {
    return this._declarations.map(cd => new ClassDeclaration(cd));
  }

  /** Asserts that there is a class with a name that matches the supplied
   * value */
  includes(
    value: string | RegExp,
    msg = `Expected a class to match "${String(value)}".`
  ): ClassDeclarations {
    const includeArray = this._declarations.filter(cd => {
      const name = cd.getName();
      if (!name) {
        return false;
      }
      return typeof value === "string"
        ? name.includes(value)
        : name.match(value);
    });
    if (!includeArray.length) {
      throw new AssertionError(msg, undefined, this.includes);
    }
    return new ClassDeclarations(includeArray);
  }

  /** Asserts the number of classes. */
  length(expected: number, msg = "Unexpected number of classes."): this {
    const actual = this._declarations.length;
    if (this._declarations.length !== expected) {
      throw new AssertionError(
        msg,
        {
          actual,
          expected,
          showDiff: true
        },
        this.length
      );
    }
    return this;
  }

  *[Symbol.iterator](): IterableIterator<ClassDeclaration> {
    for (const importDeclaration of this._declarations) {
      yield new ClassDeclaration(importDeclaration);
    }
  }
}

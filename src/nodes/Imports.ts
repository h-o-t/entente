import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";
import { ImportDeclaration } from "./ImportDeclaration";

export class Imports {
  constructor(private _declarations: ts.ImportDeclaration[]) {}

  get declarations(): ImportDeclaration[] {
    return this._declarations.map((id) => new ImportDeclaration(id));
  }

  get sourceFileNodes(): Record<string, ts.SourceFile | undefined> {
    const result: Record<string, ts.SourceFile | undefined> = {};
    for (const id of this._declarations) {
      result[
        id.getModuleSpecifier().getLiteralText()
      ] = id.getModuleSpecifierSourceFile();
    }
    return result;
  }

  get specifiers(): string[] {
    return this._declarations.map((id) =>
      id.getModuleSpecifier().getLiteralText()
    );
  }

  includes(
    value: string | RegExp,
    msg = `Expected an import to match "${String(value)}".`
  ): Imports {
    const includeArray = this._declarations.filter((id) => {
      const specifier = id.getModuleSpecifier().getLiteralText();
      return typeof value === "string"
        ? specifier.includes(value)
        : specifier.match(value);
    });
    if (!includeArray.length) {
      throw new AssertionError(msg, undefined, this.includes);
    }
    return new Imports(includeArray);
  }

  length(expected: number, msg = "Unexpected number of imports."): this {
    const actual = this._declarations.length;
    if (this._declarations.length !== expected) {
      throw new AssertionError(
        msg,
        {
          actual,
          expected,
          showDiff: true,
        },
        this.length
      );
    }
    return this;
  }

  *[Symbol.iterator](): IterableIterator<ImportDeclaration> {
    for (const importDeclaration of this._declarations) {
      yield new ImportDeclaration(importDeclaration);
    }
  }
}

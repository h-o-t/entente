import * as ts from "ts-morph";
import { SourceFile } from "./SourceFile.ts";

export class ImportDeclaration {
  constructor(private _node: ts.ImportDeclaration) {}

  sourceFile(): SourceFile {
    return new SourceFile(this._node.getModuleSpecifierSourceFileOrThrow());
  }
}

import * as AssertionError from "assertion-error";
import * as ts from "ts-morph";
import { ClassDeclarations } from "./ClassDeclarations";
import { Exports } from "./Exports";
import { Imports } from "./Imports";

export class SourceFile {
  constructor(private _node: ts.SourceFile) {}

  /** The class declarations for the source file. */
  get classes(): ClassDeclarations {
    return new ClassDeclarations(this._node.getClasses());
  }

  /** The export interfaces for the source file. */
  get exports(): Exports {
    return new Exports(this._node.getExportedDeclarations());
  }

  /** The imports for the source file. */
  get imports(): Imports {
    return new Imports(this._node.getImportDeclarations());
  }

  /** The underlying AST node. */
  get node(): ts.SourceFile {
    return this._node;
  }

  /** Assert the file path of the source file matches the expected value. */
  filePath(expected: string | RegExp, msg = "Unexpected file path."): this {
    const actual = this._node.getFilePath();
    if (!actual.match(expected)) {
      throw new AssertionError(
        msg,
        {
          actual,
          expected,
          showDiff: false
        },
        this.filePath
      );
    }
    return this;
  }
}

import * as ts from "ts-morph";
import { SourceFile } from "../nodes/SourceFile.ts";
import { ClassDeclarationsExpect } from "./ClassDeclarationsExpect.ts";
import { ExportsExpect } from "./ExportsExpect.ts";
import { ImportsExpect } from "./ImportsExpect.ts";

export class SourceFileExpect {
  constructor(private _inner: SourceFile) {}

  get classes(): ClassDeclarationsExpect {
    return new ClassDeclarationsExpect(this._inner.classes);
  }

  get exports(): ExportsExpect {
    return new ExportsExpect(this._inner.exports);
  }

  get imports(): ImportsExpect {
    return new ImportsExpect(this._inner.imports);
  }

  get node(): ts.SourceFile {
    return this._inner.node;
  }

  toHaveFilePath(expected: string | RegExp, msg?: string): this {
    this._inner.filePath(expected, msg);
    return this;
  }
}

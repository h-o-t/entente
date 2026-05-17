import { Exports } from "../nodes/Exports.ts";
import { ExportedDeclarationsArrayExpect } from "./ExportedDeclarationsArrayExpect.ts";

export class ExportsExpect {
  constructor(private _inner: Exports) {}

  toHaveDefault(msg?: string): ExportedDeclarationsArrayExpect {
    return new ExportedDeclarationsArrayExpect(this._inner.default(msg));
  }

  toHaveNamedExport(key: string | RegExp, msg?: string): ExportedDeclarationsArrayExpect {
    return new ExportedDeclarationsArrayExpect(this._inner.namedExport(key, msg));
  }
}

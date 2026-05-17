import * as ts from "ts-morph";
import { SourceFile } from "./nodes/SourceFile.ts";
import { ClassDeclaration } from "./nodes/ClassDeclaration.ts";
import { FunctionLikeDeclaration } from "./nodes/FunctionLikeDeclaration.ts";
import { Type } from "./nodes/Type.ts";
import { SourceFileExpect } from "./expect/SourceFileExpect.ts";
import { ClassDeclarationExpect } from "./expect/ClassDeclarationExpect.ts";
import { FunctionLikeDeclarationExpect } from "./expect/FunctionLikeDeclarationExpect.ts";
import { TypeExpect } from "./expect/TypeExpect.ts";

/** Return a BDD-style wrapper for a {@linkcode ts.SourceFile}. */
export function expectSourceFile(node: ts.SourceFile): SourceFileExpect {
  return new SourceFileExpect(new SourceFile(node));
}

/** Return a BDD-style wrapper for a {@linkcode ts.ClassDeclaration}. */
export function expectClass(node: ts.ClassDeclaration): ClassDeclarationExpect {
  return new ClassDeclarationExpect(new ClassDeclaration(node));
}

/** Return a BDD-style wrapper for a {@linkcode ts.FunctionLikeDeclaration}. */
export function expectFunctionLike(
  node: ts.FunctionLikeDeclaration,
): FunctionLikeDeclarationExpect {
  return new FunctionLikeDeclarationExpect(new FunctionLikeDeclaration(node));
}

/** Return a BDD-style wrapper for a {@linkcode ts.Type}. */
export function expectType(type: ts.Type): TypeExpect {
  return new TypeExpect(new Type(type));
}

/**
 * Polymorphic entry point that dispatches to the appropriate BDD wrapper
 * based on the runtime type of the value.
 *
 * **Note:** This export is named `expectNode` rather than `expect` to avoid
 * clashing with Jest and Vitest's own `expect` globals.  When you need the
 * polymorphic form in a test file that already uses another test runner's
 * `expect`, import it with an alias:
 *
 * ```ts
 * import { expectNode as expect } from "@higher-order-testing/entente";
 * ```
 *
 * The named factories (`expectSourceFile`, `expectClass`, etc.) are
 * recommended when you know the node type at the call site.
 */
export function expectNode(node: ts.SourceFile): SourceFileExpect;
export function expectNode(node: ts.ClassDeclaration): ClassDeclarationExpect;
export function expectNode(node: ts.FunctionLikeDeclaration): FunctionLikeDeclarationExpect;
export function expectNode(type: ts.Type): TypeExpect;
export function expectNode(
  value: ts.SourceFile | ts.ClassDeclaration | ts.FunctionLikeDeclaration | ts.Type,
): SourceFileExpect | ClassDeclarationExpect | FunctionLikeDeclarationExpect | TypeExpect {
  if (value instanceof ts.SourceFile) {
    return new SourceFileExpect(new SourceFile(value));
  }
  if (value instanceof ts.ClassDeclaration) {
    return new ClassDeclarationExpect(new ClassDeclaration(value));
  }
  if (value instanceof ts.Node && ts.Node.isFunctionLikeDeclaration(value)) {
    return new FunctionLikeDeclarationExpect(new FunctionLikeDeclaration(value));
  }
  return new TypeExpect(new Type(value as ts.Type));
}

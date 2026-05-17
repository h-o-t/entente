import { AssertionError } from "./assertion_error.ts";
import * as ts from "ts-morph";
import { ClassDeclaration } from "./nodes/ClassDeclaration.ts";
import { FunctionLikeDeclaration } from "./nodes/FunctionLikeDeclaration.ts";
import { SourceFile } from "./nodes/SourceFile.ts";
import { Type } from "./nodes/Type.ts";

/** Throws if the condition is not trueish. */
export function assert(cond: unknown, msg = "Failed assertion."): asserts cond {
  if (!cond) {
    throw new AssertionError(msg, undefined, assert);
  }
}

/** Returns an interface to make assertions against a class. */
export function assertClass(node: ts.ClassDeclaration): ClassDeclaration {
  return new ClassDeclaration(node);
}

/** Returns an interface to make assertions against a function like
 * declaration. */
export function assertFunctionLike(
  node: ts.FunctionLikeDeclaration,
): FunctionLikeDeclaration {
  return new FunctionLikeDeclaration(node);
}

/** Returns an interface to make assertions against a source file. */
export function assertSourceFile(node: ts.SourceFile): SourceFile {
  return new SourceFile(node);
}

/** Returns an interface to make assertions against a type. */
export function assertType(type: ts.Type): Type {
  return new Type(type);
}

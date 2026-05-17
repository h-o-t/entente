import { ClassMethod } from "../nodes/ClassMethod.ts";
import { FunctionLikeDeclarationExpect } from "./FunctionLikeDeclarationExpect.ts";

export class ClassMethodExpect extends FunctionLikeDeclarationExpect {
  constructor(inner: ClassMethod) {
    super(inner);
  }
}

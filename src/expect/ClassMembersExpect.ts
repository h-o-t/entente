import { AssertionError } from "../assertion_error.ts";
import { ClassMember } from "../nodes/ClassMember.ts";
import { ClassMemberExpect } from "./ClassMemberExpect.ts";

export class ClassMembersExpect {
  constructor(private _members: ClassMember[]) {}

  at(idx: number, msg?: string): ClassMemberExpect {
    const member = this._members[idx];
    if (!member) {
      throw new AssertionError(
        msg ?? `Expected a member at index ${idx}.`,
        undefined,
        this.at,
      );
    }
    return new ClassMemberExpect(member);
  }

  toHaveLength(expected: number, msg?: string): this {
    const actual = this._members.length;
    if (actual !== expected) {
      throw new AssertionError(
        msg ?? `Expected ${expected} member(s), got ${actual}.`,
        { actual, expected, showDiff: true },
        this.toHaveLength,
      );
    }
    return this;
  }
}

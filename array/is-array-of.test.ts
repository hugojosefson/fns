import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert/assert";
import { assertEquals } from "@std/assert/assert-equals";
import { isArrayOf } from "./is-array-of.ts";
import { isBoolean } from "../boolean/is-boolean.ts";

describe("array", () => {
  describe("isArrayOf", () => {
    it("should return true for arrays of the specified type", () => {
      const array = [true, false];
      assert(isArrayOf(isBoolean)(array));
    });

    it("should return false for arrays not of the specified type", () => {
      const array = [true, "false"];
      assertEquals(isArrayOf(isBoolean)(array), false);
    });

    it("should return false for non-arrays", () => {
      assertEquals(isArrayOf(isBoolean)("not an array"), false);
    });
  });
});

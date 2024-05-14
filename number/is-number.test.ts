import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert/assert";
import { isNumber } from "./is-number.ts";

describe("number", () => {
  describe("isNumber", () => {
    it("should return true for numbers", () => {
      assert(isNumber(0));
      assert(isNumber(123));
    });

    it("should return false for non-numbers", () => {
      assert(!isNumber("hello"));
      assert(!isNumber(true));
      assert(!isNumber(null));
      assert(!isNumber(undefined));
      assert(!isNumber({}));
      assert(!isNumber([]));
      assert(!isNumber(() => {}));
    });
  });
});

import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts";
import { assert } from "https://deno.land/std@0.221.0/assert/assert.ts";
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

import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts";
import { assert } from "https://deno.land/std@0.221.0/assert/assert.ts";
import { isString } from "./is-string.ts";

describe("string", () => {
  describe("isString", () => {
    it("should return true for strings", () => {
      assert(isString("hello"));
      assert(isString(""));
    });
    it("should return false for non-strings", () => {
      assert(!isString(0));
      assert(!isString(true));
      assert(!isString(null));
      assert(!isString(undefined));
      assert(!isString({}));
      assert(!isString([]));
      assert(!isString(() => {}));
    });
  });
});

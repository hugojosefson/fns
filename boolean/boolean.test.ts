import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts";
import { assert } from "https://deno.land/std@0.221.0/assert/assert.ts";
import { isBoolean } from "./is-boolean.ts";

describe("boolean", () => {
  describe("isBoolean", () => {
    it("should return true for booleans", () => {
      assert(isBoolean(true));
      assert(isBoolean(false));
    });
    it("should return false for non-booleans", () => {
      assert(!isBoolean(0));
      assert(!isBoolean(""));
      assert(!isBoolean(null));
      assert(!isBoolean(undefined));
      assert(!isBoolean({}));
      assert(!isBoolean([]));
      assert(!isBoolean(() => {}));
    });
  });
});

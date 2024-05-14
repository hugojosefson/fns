import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert/assert";
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

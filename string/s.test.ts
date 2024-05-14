import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert/assert";
import { assertEquals } from "@std/assert/assert-equals";
import { s } from "./s.ts";

describe("s", () => {
  describe("s", () => {
    it("should be an alias for JSON.stringify", () => {
      assert(s === JSON.stringify, "s is not an alias for JSON.stringify");
    });

    it("should stringify objects", () => {
      assertEquals(s({ a: 1 }), '{"a":1}', "does not stringify objects");
    });

    it("should stringify arrays", () => {
      assertEquals(s([1, 2, 3]), "[1,2,3]", "does not stringify arrays");
    });

    it("should stringify strings", () => {
      assertEquals(s("hello"), '"hello"', "does not stringify strings");
    });

    it("should stringify numbers", () => {
      assertEquals(s(1), "1", "does not stringify numbers");
    });

    it("should stringify booleans", () => {
      assertEquals(s(true), "true", "does not stringify booleans");
    });

    it("should stringify null", () => {
      assertEquals(s(null), "null", "does not stringify null");
    });

    it("should not stringify undefined", () => {
      assert(
        s(undefined) === undefined,
        "stringifies undefined, even though it shouldn't",
      );
    });
  });
});

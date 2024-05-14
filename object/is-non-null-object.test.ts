import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/assert-equals";
import { isNonNullObject } from "./is-non-null-object.ts";

describe("isNonNullObject", () => {
  it("should return true for non-null objects", () => {
    assertEquals(isNonNullObject({}), true);
    assertEquals(isNonNullObject({ a: 1 }), true);
  });

  it("should return false for null", () => {
    assertEquals(isNonNullObject(null), false);
  });

  it("should return false for non-objects", () => {
    assertEquals(isNonNullObject(5), false);
    assertEquals(isNonNullObject("test"), false);
    assertEquals(isNonNullObject(undefined), false);
  });
});

import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.221.0/assert/assert_equals.ts";
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

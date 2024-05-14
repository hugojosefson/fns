import { describe, it } from "https://deno.land/std@0.224.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { isTripleEqual } from "./is-triple-equal.ts";

describe("isTripleEqual", () => {
  it("should return true when the input is the same as the expected value", () => {
    const isEqualToFive = isTripleEqual(5);
    assertEquals(isEqualToFive(5), true);
  });

  it("should return false when the input is not the same as the expected value", () => {
    const isEqualToFive = isTripleEqual(5);
    assertEquals(isEqualToFive(6), false);
  });

  it("should return false when the input is loosely equal to the expected value", () => {
    const isEqualToFive = isTripleEqual(5);
    assertEquals(isEqualToFive("5"), false);
  });

  it("should return false when comparing two different empty arrays", () => {
    const isEqualToEmptyArray = isTripleEqual([]);
    assertEquals(isEqualToEmptyArray([]), false);
  });

  it("should return false when comparing null and undefined", () => {
    const isEqualToNull = isTripleEqual(null);
    assertEquals(isEqualToNull(undefined), false);
  });
});

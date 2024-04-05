import { assertNotEquals } from "https://deno.land/std@0.221.0/assert/assert_not_equals.ts";
import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.221.0/assert/assert_equals.ts";
import { reduceToLargestNumber } from "./reduce-to-largest-number.ts";

describe("reduceToLargestNumber", () => {
  it("should return the largest number in an array", () => {
    const numbers = [1, 2, 3, 4, 5];
    const largestNumber = numbers.reduce(reduceToLargestNumber, 0);
    assertEquals(largestNumber, 5);
  });

  it("should return the initial value if the array is empty", () => {
    const numbers: number[] = [];
    const largestNumber = numbers.reduce(reduceToLargestNumber, 0);
    assertEquals(largestNumber, 0);
  });

  it("should return the only number in an array with one element", () => {
    const numbers = [7];
    const largestNumber = numbers.reduce(reduceToLargestNumber, 0);
    assertEquals(largestNumber, 7);
  });

  it("should not return a number that is not the largest in the array", () => {
    const numbers = [1, 2, 3, 4, 5];
    const largestNumber = numbers.reduce(reduceToLargestNumber, 0);
    assertNotEquals(largestNumber, 4);
  });
});

import { assertNotEquals } from "@std/assert/not-equals";
import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
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

import { describe, it } from "https://deno.land/std@0.224.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { intersperse } from "./intersperse.ts";

describe("array", () => {
  describe("intersperse", () => {
    it("should intersperse the array with the separator", () => {
      const array = [1, 2, 3];
      const separator = 0;
      const expected = [1, 0, 2, 0, 3];
      assertEquals(intersperse(array, separator), expected);
    });

    it("should return an empty array when given an empty array", () => {
      const array: number[] = [];
      const separator = 0;
      const expected: number[] = [];
      assertEquals(intersperse(array, separator), expected);
    });

    it("should return the same array when given an array with one element", () => {
      const array = [1];
      const separator = 0;
      const expected = [1];
      assertEquals(intersperse(array, separator), expected);
    });
  });
});

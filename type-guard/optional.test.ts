import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.221.0/assert/assert_equals.ts";
import { isNumber } from "../number/is-number.ts";
import { optional } from "./optional.ts";

describe("type-guard", () => {
  describe("optional", () => {
    it("should return a type guard that accepts the given type guard or undefined", () => {
      const isOptionalNumber = optional(isNumber);
      assertEquals(isOptionalNumber(1), true);
      assertEquals(isOptionalNumber(undefined), true);
      assertEquals(isOptionalNumber("1"), false);
    });
  });
});

import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/assert-equals";
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

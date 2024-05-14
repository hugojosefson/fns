import { assertNotEquals } from "@std/assert/assert-not-equals";
import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/assert-equals";
import { and, andAsync } from "./and.ts";

describe("and", () => {
  it("should return true if all predicates return true", () => {
    const isEven = (n: number) => n % 2 === 0;
    const isPositive = (n: number) => n > 0;
    const isEvenAndPositive = and(isEven, isPositive);
    assertEquals(isEvenAndPositive(4), true);
    assertEquals(isEvenAndPositive(-4), false);
    assertEquals(isEvenAndPositive(5), false);
  });

  it("should not return true if one of the predicates returns false", () => {
    const isEven = (n: number) => n % 2 === 0;
    const isNegative = (n: number) => n < 0;
    const isEvenAndNegative = and(isEven, isNegative);
    assertNotEquals(isEvenAndNegative(4), true);
  });
});

describe("andAsync", () => {
  it("should return true if all async predicates return true", async () => {
    const isEvenAsync = (n: number) => Promise.resolve(n % 2 === 0);
    const isPositiveAsync = (n: number) => Promise.resolve(n > 0);
    const isEvenAndPositiveAsync = andAsync(isEvenAsync, isPositiveAsync);
    assertEquals(await isEvenAndPositiveAsync(4), true);
    assertEquals(await isEvenAndPositiveAsync(-4), false);
    assertEquals(await isEvenAndPositiveAsync(5), false);
  });
});

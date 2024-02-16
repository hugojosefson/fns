import { assertNotEquals } from "https://deno.land/std@0.216.0/assert/assert_not_equals.ts";
import { describe, it } from "https://deno.land/std@0.216.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.216.0/assert/assert_equals.ts";
import { always } from "./always.ts";

describe("always", () => {
  it("should always return the same value", () => {
    const alwaysFive = always(5);
    assertEquals(alwaysFive(), 5);
    assertEquals(alwaysFive(), 5);
    assertEquals(alwaysFive(), 5);
  });

  it("should always return the same object", () => {
    const obj = { a: 1 };
    const alwaysObj = always(obj);
    assertEquals(alwaysObj(), obj);
    assertEquals(alwaysObj(), obj);
    assertEquals(alwaysObj(), obj);
  });

  it("should not return a different value", () => {
    const alwaysFive = always(5);
    assertNotEquals(alwaysFive(), 6);
  });
});

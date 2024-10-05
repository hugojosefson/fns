import { assertNotEquals } from "@std/assert/not-equals";
import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
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

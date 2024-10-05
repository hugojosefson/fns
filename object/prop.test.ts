import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import { prop } from "./prop.ts";

describe("prop", () => {
  it("should return the value of the given key of the given object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const getA = prop("a");
    const getB = prop("b");
    const getC = prop("c");
    assertEquals(getA(obj), 1);
    assertEquals(getB(obj), 2);
    assertEquals(getC(obj), 3);
  });

  it("should return undefined if the key does not exist in the object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const getD = prop("d");
    assertEquals(getD(obj), undefined);
  });
});

import { assertEquals } from "@std/assert/assert-equals";
import { describe, it } from "@std/testing/bdd";
import { ss } from "./ss.ts";

describe("ss", () => {
  it("should stringify pretty-printed JSON", () => {
    const obj = { a: 1, b: { c: 2 } };
    const expected = `{
  "a": 1,
  "b": {
    "c": 2
  }
}`;
    assertEquals(ss(obj), expected);
  });
});

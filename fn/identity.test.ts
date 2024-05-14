import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/assert-equals";
import { identity } from "./identity.ts";

describe("identity", () => {
  it("should return the same number value", () => {
    const num = 5;
    assertEquals(identity(num), num);
  });

  it("should return the same string value", () => {
    const str = "test";
    assertEquals(identity(str), str);
  });

  it("should return the same object reference", () => {
    const obj = { a: 1 };
    assertEquals(identity(obj), obj);
  });
});

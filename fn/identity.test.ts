import { describe, it } from "https://deno.land/std@0.218.2/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.218.2/assert/assert_equals.ts";
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

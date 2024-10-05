import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import { isFunction } from "./is-function.ts";

describe("isFunction", () => {
  it("should return true when the input is a function", () => {
    const fn = () => {};
    assertEquals(isFunction(fn), true);
  });

  it("should return false when the input is not a function", () => {
    const notFn = "not a function";
    assertEquals(isFunction(notFn), false);
  });
});

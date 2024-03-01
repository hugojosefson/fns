import { describe, it } from "https://deno.land/std@0.218.2/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.218.2/assert/assert_equals.ts";
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

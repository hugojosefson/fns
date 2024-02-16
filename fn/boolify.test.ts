import { assertNotEquals } from "https://deno.land/std@0.216.0/assert/assert_not_equals.ts";
import { describe, it } from "https://deno.land/std@0.216.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.216.0/assert/assert_equals.ts";
import { boolify } from "./boolify.ts";

describe("boolify", () => {
  it("should return true when the input function returns a truthy value", () => {
    const truthyFn = (s: string) => `truthy: ${s}`;
    const boolifiedTruthyFn = boolify(truthyFn);
    assertEquals(boolifiedTruthyFn("test"), true);
  });

  it("should return false when the input function returns a falsy value", () => {
    const falsyFn = (_s: string) => "";
    const boolifiedFalsyFn = boolify(falsyFn);
    assertEquals(boolifiedFalsyFn("test"), false);
  });

  it("should not return the original truthy value", () => {
    const truthyFn = (s: string) => `truthy: ${s}`;
    const boolifiedTruthyFn = boolify(truthyFn);
    assertNotEquals(
      boolifiedTruthyFn("test"),
      `truthy: test` as never as boolean,
    );
  });

  it("should not return the original falsy value", () => {
    const falsyFn = (_s: string) => "";
    const boolifiedFalsyFn = boolify(falsyFn);
    assertNotEquals(boolifiedFalsyFn("test"), "" as never as boolean);
  });
});

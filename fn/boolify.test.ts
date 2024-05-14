import { assertNotEquals } from "@std/assert/assert-not-equals";
import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/assert-equals";
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

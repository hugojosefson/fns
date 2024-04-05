import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts";
import { assert } from "https://deno.land/std@0.221.0/assert/assert.ts";
import { assertEquals } from "https://deno.land/std@0.221.0/assert/assert_equals.ts";
import { undefinedIfEmptyString } from "./undefined-if-empty-string.ts";

describe("undefinedIfEmptyString", () => {
  it("should return undefined for empty strings", () => {
    const result = undefinedIfEmptyString("");
    assert(result === undefined);
  });

  it("should return the string for non-empty strings", () => {
    const result = undefinedIfEmptyString("hello");
    assertEquals(result, "hello");
  });
});

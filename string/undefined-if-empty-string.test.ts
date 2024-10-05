import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert/assert";
import { assertEquals } from "@std/assert/equals";
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

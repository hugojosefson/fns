import { describe, it } from "https://deno.land/std@0.218.2/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.218.2/assert/assert_equals.ts";
import { sortUnique } from "./sort-unique.ts";

describe("sortUnique", () => {
  it("should return sorted unique strings", () => {
    const strings = ["b", "a", "c", "b", "a"];
    const result = sortUnique(strings);
    assertEquals(result, ["a", "b", "c"]);
  });

  it("should return an empty array for an empty input", () => {
    const strings: string[] = [];
    const result = sortUnique(strings);
    assertEquals(result, []);
  });

  it("should handle single-element arrays", () => {
    const strings = ["a"];
    const result = sortUnique(strings);
    assertEquals(result, ["a"]);
  });
});

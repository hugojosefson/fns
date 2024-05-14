import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/assert-equals";
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

import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.221.0/assert/assert_equals.ts";
import { createDeepMapKeys } from "./deep-map-keys.ts";

describe("deepMapKeys", () => {
  describe("should map the keys of an object", () => {
    it("base case", () => {
      const deepMapKeys = createDeepMapKeys((key) => key.toUpperCase());
      const input = { a: 1, b: { c: 2 } };
      const expected = { A: 1, B: { C: 2 } };
      const actual = deepMapKeys(input);
      assertEquals(actual, expected);
    });

    it("and its nested arrays", () => {
      const deepMapKeys = createDeepMapKeys((key) => key.toUpperCase());
      const input = { a: 1, b: [{ c: 2 }] };
      const expected = { A: 1, B: [{ C: 2 }] };
      const actual = deepMapKeys(input);
      assertEquals(actual, expected);
    });

    it("and its nested objects and arrays", () => {
      const deepMapKeys = createDeepMapKeys((key) => key.toUpperCase());
      const input = { a: 1, b: [{ c: 2 }] };
      const expected = { A: 1, B: [{ C: 2 }] };
      const actual = deepMapKeys(input);
      assertEquals(actual, expected);
    });
  });

  describe("should map the keys of an array", () => {
    it("base case", () => {
      const deepMapKeys = createDeepMapKeys((key) => key.toUpperCase());
      const input = [{ a: 1 }, { b: 2 }];
      const expected = [{ A: 1 }, { B: 2 }];
      const actual = deepMapKeys(input);
      assertEquals(actual, expected);
    });

    it("and its nested objects", () => {
      const deepMapKeys = createDeepMapKeys((key) => key.toUpperCase());
      const input = [{ a: 1 }, { b: { c: 2 } }];
      const expected = [{ A: 1 }, { B: { C: 2 } }];
      const actual = deepMapKeys(input);
      assertEquals(actual, expected);
    });

    it("and its nested arrays and objects", () => {
      const deepMapKeys = createDeepMapKeys((key) => key.toUpperCase());
      const input = [{ a: 1 }, { b: { c: 2 } }];
      const expected = [{ A: 1 }, { B: { C: 2 } }];
      const actual = deepMapKeys(input);
      assertEquals(actual, expected);
    });
  });

  it("should not mutate the original object", () => {
    const deepMapKeys = createDeepMapKeys((key) => key.toUpperCase());
    const input = { a: 1, b: { c: 2 } };
    const expected = { A: 1, B: { C: 2 } };
    const actual = deepMapKeys(input);
    assertEquals(actual, expected);
    assertEquals(input, { a: 1, b: { c: 2 } });
  });

  it("should not mutate the original array", () => {
    const deepMapKeys = createDeepMapKeys((key) => key.toUpperCase());
    const input = [{ a: 1 }, { b: { c: 2 } }];
    const expected = [{ A: 1 }, { B: { C: 2 } }];
    const actual = deepMapKeys(input);
    assertEquals(actual, expected);
    assertEquals(input, [{ a: 1 }, { b: { c: 2 } }]);
  });

  it("should by default return the same type as the input", () => {
    const deepMapKeys = createDeepMapKeys((key) => key.toUpperCase());
    const input: Record<string, unknown> = { a: 1, b: { c: 2 } };
    const actual: Record<string, unknown> = deepMapKeys(input);
    const expected: Record<string, unknown> = { A: 1, B: { C: 2 } };
    assertEquals(actual, expected);
  });
});

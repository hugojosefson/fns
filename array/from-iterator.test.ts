import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { assert } from "https://deno.land/std@0.224.0/assert/assert.ts";
import { describe, it } from "https://deno.land/std@0.224.0/testing/bdd.ts";
import { fromIterator } from "./from-iterator.ts";

function* range(startAt: number, endBefore: number): IterableIterator<number> {
  for (let i = startAt; i < endBefore; i++) {
    yield i;
  }
}

describe("fromIterator", () => {
  it("should return an empty array for an empty iterator", () => {
    const input = range(0, 0);
    const actual = fromIterator(input);
    assertEquals(actual, []);
  });

  it("should return an array with the items from the iterator", () => {
    const input = range(1, 4);
    const actual = fromIterator(input);
    assertEquals(actual, [1, 2, 3]);
  });

  it("should return the very same objects as the iterator", () => {
    const input = [{ a: 1 }, { b: 2 }];
    const actual = fromIterator(input);
    assertEquals(actual.length, input.length);
    assert(actual[0] === input[0]);
    assert(actual[1] === input[1]);
  });
});

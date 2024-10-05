import { assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { s } from "../string/s.ts";
import { intoIterable } from "./into-iterable.ts";

const SHOULD_THROWS = [
  undefined,
  null,
  "hello",
  5,
  true,
  {},
  () => {},
];

/**
 * Inputs compatible with `intoIterable` and their expected outputs.
 */
type ShouldWork<T> = {
  name?: string;
  input: Iterable<T> | Iterator<T>;
  expected: T[];
};

const SHOULD_WORKS: ShouldWork<unknown>[] = [
  {
    name: "Array",
    input: [1, 2, 3],
    expected: [1, 2, 3],
  },
  {
    name: "Set",
    input: new Set([1, 2, 3]),
    expected: [1, 2, 3],
  },
  {
    name: "Map",
    input: new Map([["a", 1], ["b", 2], ["c", 3]]),
    expected: [["a", 1], ["b", 2], ["c", 3]],
  },
  {
    name: "Iterable",
    input: {
      [Symbol.iterator](): Iterator<string> {
        const results = ["a", "b", "c"];
        let i = 0;
        return {
          next: () => {
            if (i === results.length) {
              return { done: true, value: undefined };
            }
            return { done: false, value: results[i++] };
          },
        };
      },
    } satisfies Iterable<string>,
    expected: ["a", "b", "c"],
  },
  {
    name: "Iterator",
    input: new class {
      private i = 0;
      private results = ["a", "b", "c"];
      next(): IteratorResult<string> {
        if (this.i === this.results.length) {
          return { done: true, value: undefined };
        }
        return { done: false, value: this.results[this.i++] };
      }
    }() satisfies Iterator<string>,
    expected: ["a", "b", "c"],
  },
];

describe("into-iterable", () => {
  describe("intoIterable", () => {
    for (const input of SHOULD_THROWS) {
      it(`should throw for ${s(input)}`, () => {
        assertThrows(() => intoIterable(input as unknown as Iterable<unknown>));
      });
    }
    for (
      const { name, input, expected } of SHOULD_WORKS
    ) {
      it(`should convert ${name ?? s(input)} into an Iterable with ${s(expected)}`, () => {
        const actual = intoIterable(input);
        const output: unknown[] = [];
        for (const item of actual) {
          output.push(item);
        }
        assertEquals(output, expected);
      });
    }
  });
});

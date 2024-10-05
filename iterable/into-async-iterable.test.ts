import { assert, assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { s } from "../string/s.ts";
import { intoAsyncIterable } from "./into-async-iterable.ts";
import { isAsyncIterable } from "./is-async-iterable.ts";
import type { StreamLike } from "./stream-like.ts";
import type { EventEmitterLike } from "./event-emitter-like.ts";

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
 * A {@linkt StreamLike} input, and the expected output after iterating over it and saving it to an array.
 */
type ShouldWork<T> = {
  name?: string;
  input: StreamLike<T>;
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
    name: "ReadableStream",
    input: new ReadableStream({
      start(controller) {
        controller.enqueue("a");
        controller.enqueue("b");
        controller.enqueue("c");
        controller.close();
      },
    }),
    expected: ["a", "b", "c"],
  },
  {
    name: "AsyncIterator",
    input: {
      [Symbol.asyncIterator](): AsyncIterator<string> {
        const results = ["a", "b", "c"];
        let i = 0;
        return {
          next: () => {
            if (i === results.length) {
              return Promise.resolve({ done: true, value: undefined });
            }
            return Promise.resolve({ done: false, value: results[i++] });
          },
        };
      },
    } satisfies AsyncIterable<string>,
    expected: ["a", "b", "c"],
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
    name: "EventEmitterLike",
    input: new class {
      private listeners: Map<string, ((data: string) => void)[]> = new Map();
      on(event: string, listener: (data: string) => void) {
        const listeners = this.listeners.get(event) ?? [];
        listeners.push(listener);
        this.listeners.set(event, listeners);
        if (event === "end") {
          this.emit("data", "a");
          this.emit("data", "b");
          this.emit("data", "c");
          this.emit("end", "");
        }
        return this;
      }
      emit(event: string, data: string) {
        const listeners = this.listeners.get(event) ?? [];
        for (const listener of listeners) {
          listener(data);
        }
      }
    }() satisfies EventEmitterLike<string>,
    expected: ["a", "b", "c"],
  },
];

describe("into-async-iterable", () => {
  describe("intoAsyncIterable", () => {
    for (const input of SHOULD_THROWS) {
      it(`should throw for ${s(input)}`, () => {
        assertThrows(() => intoAsyncIterable(input as unknown as []));
      });
    }
    for (
      const { name, input, expected } of SHOULD_WORKS
    ) {
      it(`should convert ${name ?? s(input)} into an AsyncIterable with ${s(expected)}`, async () => {
        const actual = intoAsyncIterable(input);
        assert(isAsyncIterable(actual));
        const output: unknown[] = [];
        for await (const item of actual) {
          output.push(item);
        }
        assertEquals(output, expected);
      });
    }
  });
});

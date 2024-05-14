import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { describe, it } from "https://deno.land/std@0.224.0/testing/bdd.ts";
import { fromAsyncIterator } from "./from-async-iterator.ts";

describe("fromAsyncIterator", () => {
  it("should return an empty array for an empty AsyncIterable", async () => {
    const input: AsyncIterable<unknown> = {
      [Symbol.asyncIterator](): AsyncIterator<unknown> {
        return {
          next: () => Promise.resolve({ done: true, value: undefined }),
        };
      },
    };
    const actual = await fromAsyncIterator(input);
    assertEquals(actual, []);
  });

  it("should return an empty array for an empty AsyncIterator", async () => {
    const input: AsyncIterator<unknown> = {
      next: () => Promise.resolve({ done: true, value: undefined }),
    };
    const actual = await fromAsyncIterator(input);
    assertEquals(actual, []);
  });

  it("should return an empty array for an empty AsyncIterableIterator", async () => {
    const asyncIterator: AsyncIterator<unknown> = {
      next: () => Promise.resolve({ done: true, value: undefined }),
    };
    const input: AsyncIterableIterator<unknown> = {
      ...asyncIterator,
      [Symbol.asyncIterator](): AsyncIterator<unknown> {
        return input;
      },
    } as AsyncIterableIterator<unknown>;
    const actual = await fromAsyncIterator(input);
    assertEquals(actual, []);
  });

  it("should return items from an AsyncIterableIterator", async () => {
    let i = 0;
    const asyncIterator: AsyncIterableIterator<number> = {
      next: () => Promise.resolve({ done: i++ === 2, value: i }),
      [Symbol.asyncIterator](): AsyncIterator<number> {
        return asyncIterator;
      },
    } as AsyncIterableIterator<number>;
    const actual = await fromAsyncIterator(asyncIterator);
    assertEquals(actual, [1, 2]);
  });

  it("should return items from an AsyncIterator", async () => {
    let i = 0;
    const asyncIterator: AsyncIterator<number> = {
      next: () => Promise.resolve({ done: i++ === 2, value: i }),
    };
    const actual = await fromAsyncIterator(asyncIterator);
    assertEquals(actual, [1, 2]);
  });

  it("should return items from an AsyncIterable", async () => {
    let i = 0;
    const asyncIterator: AsyncIterable<number> = {
      [Symbol.asyncIterator](): AsyncIterator<number> {
        return {
          next: () => Promise.resolve({ done: i++ === 2, value: i }),
        };
      },
    };
    const actual = await fromAsyncIterator(asyncIterator);
    assertEquals(actual, [1, 2]);
  });
});

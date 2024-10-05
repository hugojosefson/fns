import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert/assert";
import { isReadableStream } from "./is-readable-stream.ts";

describe("is-readable-stream", () => {
  describe("isReadableStream", () => {
    it("should return false for {} (empty object)", () => {
      const input = {};
      assert(!isReadableStream(input));
    });

    it("should return false for [] (empty array)", () => {
      const input: unknown[] = [];
      assert(!isReadableStream(input));
    });

    it("should return false for null", () => {
      const input = null;
      assert(!isReadableStream(input));
    });

    it("should return false for undefined", () => {
      const input = undefined;
      assert(!isReadableStream(input));
    });

    it("should return false for a string", () => {
      const input = "hello";
      assert(!isReadableStream(input));
    });

    it("should return true for ReadableStream", () => {
      const input = new ReadableStream();
      assert(isReadableStream(input));
    });

    it("should return true for descendants of ReadableStream", () => {
      class MyReadableStream<T = unknown> extends ReadableStream<T> {
        constructor(
          underlyingSource?: UnderlyingSource<T>,
          strategy?: QueuingStrategy<T>,
        ) {
          super(underlyingSource, strategy);
        }
      }
      const input = new MyReadableStream();
      assert(isReadableStream(input));
    });
  });
});

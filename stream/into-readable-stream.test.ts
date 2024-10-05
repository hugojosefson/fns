import { assert, assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { intoReadableStream } from "./into-readable-stream.ts";
import { isReadableStream } from "./is-readable-stream.ts";

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
 * A set of inputs and their expected outputs when converted to `ReadableStream`.
 */
type ShouldWork<T> = {
  name?: string;
  input: AsyncIterable<T> | ReadableStream<T>;
  expected: T[];
};

const SHOULD_WORKS: ShouldWork<unknown>[] = [
  {
    name: "Array as AsyncIterable",
    input: (async function* () {
      yield* [1, 2, 3];
    })(),
    expected: [1, 2, 3],
  },
  {
    name: "ReadableStream",
    input: new ReadableStream({
      start(controller) {
        controller.enqueue(1);
        controller.enqueue(2);
        controller.enqueue(3);
        controller.close();
      },
    }),
    expected: [1, 2, 3],
  },
];

describe("into-readable-stream", () => {
  describe("intoReadableStream", () => {
    for (const input of SHOULD_THROWS) {
      it(`should throw for ${input}`, () => {
        assertThrows(() =>
          intoReadableStream(input as unknown as AsyncIterable<unknown>)
        );
      });
    }
    for (const { name, input, expected } of SHOULD_WORKS) {
      it(`should convert ${name} into a ReadableStream`, async () => {
        const readableStream = intoReadableStream(input);
        assert(isReadableStream(readableStream));

        const reader = readableStream.getReader();
        const output: unknown[] = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          output.push(value);
        }
        assertEquals(output, expected);
      });
    }
  });
});

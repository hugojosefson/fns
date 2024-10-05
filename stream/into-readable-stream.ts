import { intoAsyncIterable } from "../iterable/into-async-iterable.ts";
import { isAsyncIterable } from "../iterable/is-async-iterable.ts";
import type { StreamLike } from "../iterable/stream-like.ts";
import { intoReadableStreamFromAsyncIterator } from "./into-readable-stream-from-async-iterator.ts";
import { isReadableStream } from "./is-readable-stream.ts";

/**
 * Converts an {@link AsyncIterable<T>}, into a {@link ReadableStream<T>}.
 * @param input the stream to convert
 * @returns a `ReadableStream`
 */
export function intoReadableStream<T>(input: StreamLike<T>): ReadableStream<T> {
  if (isReadableStream<T>(input)) {
    return input;
  }

  if (isAsyncIterable<T>(input)) {
    return intoReadableStreamFromAsyncIterator(input[Symbol.asyncIterator]());
  }

  const asyncIterable = intoAsyncIterable(input);
  return intoReadableStreamFromAsyncIterator(
    asyncIterable[Symbol.asyncIterator](),
  );
}

import { isEventEmitterLike } from "./event-emitter-like.ts";
import { intoAsyncIterableFromEventEmitterLike } from "./into-async-iterable-from-event-emitter-like.ts";
import { intoAsyncIterableFromIterable } from "./into-async-iterable-from-iterable.ts";
import { intoAsyncIterableFromIteratorOrAsyncIterator } from "./into-async-iterable-from-iterator-or-async-iterator.ts";
import type { StreamLike } from "./stream-like.ts";
import { isAsyncIterable } from "./is-async-iterable.ts";
import { isIterable } from "./is-iterable.ts";
import { isIteratorOrAsyncIterator } from "./is-iterator-or-async-iterator.ts";

/**
 * Converts any {@link StreamLike}, into an {@link AsyncIterable}.
 * @param input the input to convert
 * @returns an `AsyncIterable` of items from the input
 */
export function intoAsyncIterable<T>(input: StreamLike<T>): AsyncIterable<T> {
  if (isAsyncIterable(input)) {
    return input;
  }
  if (isIterable(input)) {
    return intoAsyncIterableFromIterable(input);
  }
  if (isIteratorOrAsyncIterator(input)) {
    return intoAsyncIterableFromIteratorOrAsyncIterator(input);
  }
  if (isEventEmitterLike(input)) {
    return intoAsyncIterableFromEventEmitterLike(input);
  }
  throw new Error(`Could not convert input, into an AsyncIterable: ${input}`);
}

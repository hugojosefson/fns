import type { EventEmitterLike } from "./event-emitter-like.ts";

/**
 * Any type that we can read as a stream.
 *
 * @typeParam T the type of each item in the stream
 */
export type StreamLike<T> =
  | AsyncIterator<T>
  | AsyncIterableIterator<T>
  | AsyncIterable<T>
  | Iterable<T>
  | Iterator<T>
  | EventEmitterLike<T>;

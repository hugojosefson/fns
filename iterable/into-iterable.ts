import { intoIterableFromIterator } from "./into-iterable-from-iterator.ts";
import { isIterable } from "./is-iterable.ts";
import { isIteratorOrAsyncIterator } from "./is-iterator-or-async-iterator.ts";

/**
 * Converts an {@link Iterator}, {@link IterableIterator}, or {@link Iterable} to an {@link Iterable}.
 * @param input the input to convert
 * @returns an `Iterable` of items from the input
 */
export function intoIterable<T>(
  input:
    | Iterator<T>
    | IterableIterator<T>
    | Iterable<T>,
): Iterable<T> {
  if (isIterable(input)) {
    return input;
  }
  if (isIteratorOrAsyncIterator(input)) {
    return intoIterableFromIterator(input);
  }
  throw new Error(`Could not convert input to Iterable: ${input}`);
}

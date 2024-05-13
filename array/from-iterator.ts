import { intoIterable } from "../iterable/into-iterable.ts";

/**
 * Converts an {@link IterableIterator}, {@link Iterator}, or {@link Iterable} to an {@link Array}.
 * @param iterator The iterator to convert.
 * @returns The array of items from the iterator.
 */
export function fromIterator<T>(
  iterator: Iterator<T> | IterableIterator<T> | Iterable<T>,
): T[] {
  const iterable: Iterable<T> = intoIterable(iterator);
  return Array.from(iterable) as T[];
}

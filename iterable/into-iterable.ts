import { isFunction } from "../fn/is-function.ts";
import { createIsRecordWithProperty } from "../object/is-record.ts";

/**
 * Checks if the given object has a {@link Symbol.iterator} property.
 * @param obj The object to check.
 * @returns `true` if the object has a {@link Symbol.iterator} property, `false` otherwise.
 */
const hasIteratorSymbol = createIsRecordWithProperty(
  Symbol.iterator,
  isFunction,
);
const hasNextMethod = createIsRecordWithProperty(
  "next",
  isFunction,
);

/**
 * Converts an {@link Iterator}, {@link IterableIterator}, or {@link Iterable} to an {@link Iterable}.
 * @param iterator The iterator to convert.
 * @returns The iterable of items from the iterator.
 */
export function intoIterable<T>(
  iterator: Iterator<T> | IterableIterator<T> | Iterable<T>,
): Iterable<T> {
  if (hasIteratorSymbol(iterator)) {
    return iterator as Iterable<T>;
  }
  if (hasNextMethod(iterator)) {
    return {
      [Symbol.iterator](): Iterator<T> {
        return iterator;
      },
    };
  }
  throw new Error(
    `iterator has neither a Symbol.iterator method, nor a next method.`,
  );
}

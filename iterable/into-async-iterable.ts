import { isFunction } from "../fn/is-function.ts";
import { createIsRecordWithProperty } from "../object/is-record.ts";

/**
 * Checks if the given object has a {@link Symbol.asyncIterator} property.
 * @param obj The object to check.
 * @returns `true` if the object has an {@link Symbol.asyncIterator} property, `false` otherwise.
 */
const hasAsyncIteratorSymbol = createIsRecordWithProperty(
  Symbol.asyncIterator,
  isFunction,
);
const hasNextMethod = createIsRecordWithProperty(
  "next",
  isFunction,
);

/**
 * Converts an {@link AsyncIterator}, {@link AsyncIterableIterator}, or {@link AsyncIterable} to an {@link AsyncIterable}.
 * @param asyncIterator The async iterator to convert.
 * @returns The async iterable of items from the async iterator.
 */
export function intoAsyncIterable<T>(
  asyncIterator: AsyncIterator<T> | AsyncIterableIterator<T> | AsyncIterable<T>,
): AsyncIterable<T> {
  if (hasAsyncIteratorSymbol(asyncIterator)) {
    return asyncIterator as AsyncIterable<T>;
  }
  if (hasNextMethod(asyncIterator)) {
    return {
      [Symbol.asyncIterator](): AsyncIterator<T> {
        return {
          next: () => asyncIterator.next(),
        };
      },
    };
  }
  throw new Error(
    `asyncIterator has neither a Symbol.asyncIterator method, nor a next method.`,
  );
}

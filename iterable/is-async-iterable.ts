import { isFunction } from "../fn/is-function.ts";
import { createIsRecordWithProperty } from "../object/is-record.ts";

const isAnyAsyncIterable = createIsRecordWithProperty(
  Symbol.asyncIterator,
  isFunction,
);

/**
 * Type guard to determine if a value is an {@link AsyncIterable<T>}.
 *
 * @typeParam T the type of the values in the {@link AsyncIterable<T>}. Not actually checked, only for convenience.
 * @param value the value to check
 * @returns `true` if the value is an {@link AsyncIterable<T>}, `false` otherwise
 */
export function isAsyncIterable<T>(value: unknown): value is AsyncIterable<T> {
  return isAnyAsyncIterable(value);
}

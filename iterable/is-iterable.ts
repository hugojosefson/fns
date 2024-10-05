import { isFunction } from "../fn/is-function.ts";
import { createIsRecordWithProperty } from "../object/is-record.ts";

const isAnyIterable = createIsRecordWithProperty(
  Symbol.iterator,
  isFunction,
);

/**
 * Type guard to determine if a value is an {@link Iterable<T>}.
 *
 * @typeParam T the type of the values in the {@link Iterable<T>}. Not actually checked, only for convenience.
 * @param value the value to check
 * @returns `true` if the value is an {@link Iterable<T>}, `false` otherwise
 */
export function isIterable<T>(value: unknown): value is Iterable<T> {
  return isAnyIterable(value);
}

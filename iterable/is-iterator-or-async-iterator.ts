import { isFunction } from "../fn/is-function.ts";
import { createIsRecordWithProperty } from "../object/is-record.ts";

const isAnyIterator = createIsRecordWithProperty("next", isFunction);

/**
 * Type guard to determine if a value is an {@link Iterator<T>} or {@link AsyncIterator<T>}.
 *
 * @typeParam T the type of the values in the {@link Iterator<T>}. Not actually checked, only for convenience.
 * @param value the value to check
 * @returns `true` if the value is an {@link Iterator<T>} or {@link AsyncIterator<T>}, `false` otherwise
 */
export function isIteratorOrAsyncIterator<T>(
  value: unknown,
): value is Iterator<T> | AsyncIterator<T> {
  return isAnyIterator(value);
}

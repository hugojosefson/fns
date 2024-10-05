import { isFunction } from "../fn/is-function.ts";
import { createIsRecordWithProperty } from "../object/is-record.ts";

/**
 * A minimal interface that allows us to read something as a stream.
 * @typeParam T the type of the data in the stream. Not actually checked, only for convenience.
 */
export interface EventEmitterLike<T> {
  on(event: "data", listener: (data: T) => void): this;
  on(event: "end", listener: () => void): this;
  on(event: "error", listener: (err: unknown) => void): this;
}

const isAnyEventEmitterLike = createIsRecordWithProperty(
  "on",
  isFunction,
);

/**
 * Type guard to determine if a value is any stream-like object that implements the `on` method.
 * @typeParam T the type of the data in the stream. Not actually checked, only for convenience.
 * @param value the value to check
 * @returns `true` if the value is any stream-like object that implements the `on` method, `false` otherwise
 */
export function isEventEmitterLike<T>(
  value: unknown,
): value is EventEmitterLike<T> {
  return isAnyEventEmitterLike(value);
}

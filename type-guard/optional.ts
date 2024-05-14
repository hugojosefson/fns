import type { TypeGuard } from "./type-guard.ts";

/**
 * A type that is either `T` or `undefined`.
 */
export type Optional<T> = T | undefined;

/**
 * A type guard for `Optional<T>`.
 */
export type OptionalTypeGuard<T> = TypeGuard<Optional<T>>;

/**
 * Returns a {@link TypeGuard} that accepts the given type guard, or `undefined`.
 * @param typeGuard The type guard to make optional.
 * @returns A type guard that accepts the given type guard, or `undefined`.
 */
export function optional<T>(typeGuard: TypeGuard<T>): OptionalTypeGuard<T> {
  return (value: unknown): value is T | undefined =>
    value === undefined || typeGuard(value);
}

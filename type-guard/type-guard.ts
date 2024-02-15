/**
 * A type guard for `T`.
 */
export type TypeGuard<T> = (value: unknown) => value is T;

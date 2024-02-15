import { Getter } from "./getter.ts";

/**
 * Creates a function that always returns the same value.
 * @param value the value to return
 * @returns a function that always returns the same value
 */
export function always<T>(value: T): Getter<T> {
  return () => value;
}

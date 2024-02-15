import { Predicate } from "./predicate.ts";

/**
 * Converts a function's return value to a boolean. This function takes in a function that returns a value,
 * and returns a new function that converts the result of the input function to a boolean.
 * @param fn the function whose return value is to be converted to a boolean
 * @returns a function that converts the result of the input function to a boolean
 */
export function boolify<T>(fn: (x: T) => unknown): Predicate<T> {
  return (x) => !!fn(x);
}

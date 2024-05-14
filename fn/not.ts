import type { Not } from "../boolean/not.ts";
import type { AsyncPredicate, Predicate } from "./predicate.ts";

/**
 * Negates a boolean function. This function takes in a function that returns a boolean,
 * and returns a new function that negates the result of the input function.
 * @param fn the function to negate
 * @returns a function that negates the result of the input function
 */
export function not<T, R extends boolean>(
  fn: Predicate<T, R>,
): Predicate<T, Not<R>> {
  return (x) => !fn(x) as Not<R>;
}

/**
 * Negates an async boolean function. This function takes in a function that returns a boolean or a promise of a boolean,
 * and returns a new function that negates the result of the input function.
 * @param fn the function to negate
 * @returns a function that negates the result of the input function
 */
export function notAsync<T, R extends boolean>(
  fn: AsyncPredicate<T, R>,
): AsyncPredicate<T, Not<R>> {
  return async (x) => !(await fn(x)) as Not<R>;
}

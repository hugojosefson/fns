import type { AsyncPredicate, Predicate } from "./predicate.ts";

/**
 * Returns true if any given function returns true. This function takes in a variable number of functions,
 * and returns a new function that returns true if any input function returns true.
 * @param fns the functions to check
 * @returns a function that returns true if any input function returns true
 */
export function or<T>(...fns: Predicate<T>[]): Predicate<T> {
  return (x) => fns.some((fn) => fn(x));
}

/**
 * Returns true if any given async function returns true. This function takes in a variable number of async functions,
 * and returns a new async function that returns true if any input async function returns true.
 * @param fns the async functions to check
 * @returns an async function that returns true if any input async function returns true
 */
export function orAsync<T>(...fns: AsyncPredicate<T>[]): AsyncPredicate<T> {
  return async (x) => {
    for (const fn of fns) {
      if (await fn(x)) {
        return true;
      }
    }
    return false;
  };
}

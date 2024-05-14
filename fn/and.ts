import type { AsyncPredicate, Predicate } from "./predicate.ts";

/**
 * Returns true if all given functions return true. This function takes in a variable number of functions,
 * and returns a new function that returns true if all input functions return true.
 * @param fns the functions to check
 * @returns a function that returns true if all input functions return true
 */
export function and<T>(...fns: Predicate<T>[]): Predicate<T> {
  return (x) => fns.every((fn) => fn(x));
}

/**
 * Returns true if all given async functions return true. This function takes in a variable number of async functions,
 * and returns a new async function that returns true if all input async functions return true.
 * @param fns the async functions to check
 * @returns an async function that returns true if all input async functions return true
 */
export function andAsync<T>(...fns: AsyncPredicate<T>[]): AsyncPredicate<T> {
  return async (x) => {
    for (const fn of fns) {
      if (!(await fn(x))) {
        return false;
      }
    }
    return true;
  };
}

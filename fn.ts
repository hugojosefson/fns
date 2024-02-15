import { Not } from "./boolean/not.ts";
import { TypeGuard } from "./type-guard.ts";

/**
 * A no-args function that returns something of type T.
 */
export type Getter<T> = () => T;

/**
 * A function that takes an input of type T and returns a value of type R.
 */
export type Transformer<T, R> = (value: T) => R;

/**
 * A function that looks up a value of type V by a key of type K.
 */
export type Lookuper<K, V> = Transformer<K, V>;

/**
 * A function that takes an input of type T and returns a value of type R, or a promise of a value of type R.
 */
export type AsyncTransformer<T, R> = (value: T) => Promise<R> | R;

export function pipe<A, B>(
  fnA: (arg: A) => B,
): (arg: A) => B;
export function pipe<A, B, C>(
  fnA: (arg: A) => B,
  fnB: (arg: B) => C,
): (arg: A) => C;
export function pipe<A, B, C, D>(
  fnA: (arg: A) => B,
  fnB: (arg: B) => C,
  fnC: (arg: C) => D,
): (arg: A) => D;
export function pipe<A, B, C, D, E>(
  fnA: (arg: A) => B,
  fnB: (arg: B) => C,
  fnC: (arg: C) => D,
  fnD: (arg: D) => E,
): (arg: A) => E;
export function pipe<A, B, C, D, E, F>(
  fnA: (arg: A) => B,
  fnB: (arg: B) => C,
  fnC: (arg: C) => D,
  fnD: (arg: D) => E,
  fnE: (arg: E) => F,
): (arg: A) => F;
/**
 * Compose functions from right to left. This function takes in a variable number of functions
 * and returns a new function that applies these functions from right to left.
 * @param fns the functions to compose
 * @returns a function that applies the input functions from right to left
 */
export function pipe<T>(...fns: ((x: T) => T)[]): (x: T) => T {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

/**
 * Compose async functions from right to left. This function takes in a̶ ̶v̶a̶r̶i̶a̶b̶l̶e̶ ̶n̶u̶m̶b̶e̶r̶ ̶o̶f̶ **3** async functions
 * and returns a new async function that applies these async functions from right to left.
 * @returns an async function that applies the input async functions from right to left
 * @note This function only supports exactly 3 input functions.
 */
export function pipeAsync3<A, B, C, D>(
  fnA: (arg: A) => B | Promise<B>,
  fnB: (arg: B) => C | Promise<C>,
  fnC: (arg: C) => D | Promise<D>,
): (arg: A) => Promise<D> {
  return async (arg) => fnC(await fnB(await fnA(arg)));
}

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

/**
 * Converts a function's return value to a boolean. This function takes in a function that returns a value,
 * and returns a new function that converts the result of the input function to a boolean.
 * @param fn the function whose return value is to be converted to a boolean
 * @returns a function that converts the result of the input function to a boolean
 */
export function boolify<T>(fn: (x: T) => unknown): Predicate<T> {
  return (x) => !!fn(x);
}

/**
 * Converts a function's return value to a string. This function takes in a function that returns a value,
 * and returns a new function that converts the result of the input function to a string.
 * @param fn the function whose return value is to be converted to a string
 * @returns a function that converts the result of the input function to a string
 */
export function stringify<T>(fn: (x: T) => unknown): (x: T) => string {
  return (x) => `${fn(x)}`;
}

/**
 * Use this with `Promise.prototype.catch` to swallow errors of a specific type.
 * @example
 * ```ts
 * const contents: string|undefined = await Deno.readTextFile("foo.txt").catch(swallow(Deno.errors.NotFound));
 * ```
 * @example
 * ```ts
 * const contents: string = await Deno.readTextFile("foo.txt").catch(swallow(Deno.errors.NotFound, "Sorry :( no file found"));
 * ```
 * @param errorType the type of error to swallow
 * @param defaultValue the value to return if the error is swallowed
 */
export function swallow<
  E extends Error,
  T,
  A extends unknown[] = unknown[],
>(
  errorType: new (...args: A) => E,
  defaultValue: T = undefined as unknown as T,
): (reason: Error | unknown) => Promise<T> {
  return (reason) => {
    if (reason instanceof errorType) {
      return Promise.resolve(defaultValue);
    }
    return Promise.reject(reason);
  };
}

/**
 * A type guard for functions.
 * @param value The value to check
 * @returns Whether the value is a function
 */
export function isFunction<T extends (...args: unknown[]) => unknown>(
  value: unknown,
  // deno-lint-ignore ban-types
): value is T & Function {
  return typeof value === "function";
}

/**
 * Creates a function that always returns the same value.
 * @param value the value to return
 * @returns a function that always returns the same value
 */
export function always<T>(value: T): Getter<T> {
  return () => value;
}

/**
 * A predicate and type guard for a specific value.
 * @param expected The value to check for
 * @returns A predicate and type guard for the specific value
 */
export function isTripleEqual<T>(expected: T): TypeGuard<T> & Predicate<T> {
  return (value: unknown): value is T => {
    return value === expected;
  };
}

/**
 * A function that evaluates something about the input, and returns a boolean.
 * @param value The value to check
 * @returns Whether the value passes the check
 */
export type Predicate<T, R extends boolean = boolean> = Transformer<T, R>;

/**
 * A function that evaluates something about the input, and returns a boolean or a promise of a boolean.
 * @param value The value to check
 * @returns Whether the value passes the check
 */
export type AsyncPredicate<T, R extends boolean = boolean> = AsyncTransformer<
  T,
  R
>;

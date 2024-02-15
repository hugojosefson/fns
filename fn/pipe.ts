import { AsyncTransformer, Transformer } from "./transformer.ts";

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
export function pipe<T>(...fns: Transformer<T, T>[]): Transformer<T, T> {
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
): AsyncTransformer<A, D> {
  return async (arg) => fnC(await fnB(await fnA(arg)));
}

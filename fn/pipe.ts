import { identity } from "./identity.ts";
import type { AsyncTransformer, Transformer } from "./transformer.ts";

export function pipe<A>(): Transformer<A, A>;
export function pipe<A, B = A>(
  fnA: Transformer<A, B>,
): Transformer<A, B>;
export function pipe<A, B = A, C = B>(
  fnA: Transformer<A, B>,
  fnB: Transformer<B, C>,
): Transformer<A, C>;
export function pipe<A, B = A, C = B, D = C>(
  fnA: Transformer<A, B>,
  fnB: Transformer<B, C>,
  fnC: Transformer<C, D>,
): Transformer<A, D>;
export function pipe<A, B = A, C = B, D = C, E = D>(
  fnA: Transformer<A, B>,
  fnB: Transformer<B, C>,
  fnC: Transformer<C, D>,
  fnD: Transformer<D, E>,
): Transformer<A, E>;
export function pipe<A, B = A, C = B, D = C, E = D, F = E>(
  fnA: Transformer<A, B>,
  fnB: Transformer<B, C>,
  fnC: Transformer<C, D>,
  fnD: Transformer<D, E>,
  fnE: Transformer<E, F>,
): Transformer<A, F>;
/**
 * Compose functions from right to left. This function takes in a variable number of functions
 * and returns a new function that applies these functions from right to left.
 * @param fns the functions to compose
 * @returns a function that applies the input functions from right to left
 */
export function pipe<T>(...fns: Transformer<T, T>[]): Transformer<T, T> {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

export function pipeAsync<A>(): AsyncTransformer<A, A>;
export function pipeAsync<A, B = A>(
  fnA: AsyncTransformer<A, B>,
): AsyncTransformer<A, B>;
export function pipeAsync<A, B = A, C = B>(
  fnA: AsyncTransformer<A, B>,
  fnB: AsyncTransformer<B, C>,
): AsyncTransformer<A, C>;
export function pipeAsync<A, B = A, C = B, D = C>(
  fnA: AsyncTransformer<A, B>,
  fnB: AsyncTransformer<B, C>,
  fnC: AsyncTransformer<C, D>,
): AsyncTransformer<A, D>;
export function pipeAsync<A, B = A, C = B, D = C, E = D>(
  fnA: AsyncTransformer<A, B>,
  fnB: AsyncTransformer<B, C>,
  fnC: AsyncTransformer<C, D>,
  fnD: AsyncTransformer<D, E>,
): AsyncTransformer<A, E>;
export function pipeAsync<A, B = A, C = B, D = C, E = D, F = E>(
  fnA: AsyncTransformer<A, B>,
  fnB: AsyncTransformer<B, C>,
  fnC: AsyncTransformer<C, D>,
  fnD: AsyncTransformer<D, E>,
  fnE: AsyncTransformer<E, F>,
): AsyncTransformer<A, F>;
/**
 * Compose async functions from right to left. This function takes in a variable number of async functions
 * and returns a new async function that applies these async functions from right to left.
 * @param fns the async functions to compose
 * @returns an async function that applies the input async functions from right to left
 */
export function pipeAsync<T>(
  ...fns: AsyncTransformer<T, T>[]
): AsyncTransformer<T, T> {
  return fns
    .reduce(
      (acc, fn) => async (x) => await fn(await acc(x)),
      identity,
    );
}

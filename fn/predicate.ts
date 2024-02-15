import { AsyncTransformer, Transformer } from "./transformer.ts";

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

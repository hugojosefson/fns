import { TypeGuard } from "../type-guard.ts";
import { isString } from "./is-string.ts";
import { only, sequence, startWith } from "./regex.ts";

/**
 * A string that starts with a specific string.
 */
export type StringStartingWith<Prefix extends string> = `${Prefix}${string}`;

/**
 * A string that contains a specific string.
 */
export type StringContaining<Infix extends string> =
  `${string}${Infix}${string}`;

/**
 * A string that ends with a specific string.
 */
export type StringEndingWith<Suffix extends string> = `${string}${Suffix}`;

/**
 * A string that starts with a specific string, and ends with a specific string.
 */
export type StringSurroundedBy<
  Prefix extends string,
  Suffix extends string,
  Infix extends string = string,
> = `${Prefix}${Infix}${Suffix}`;

/**
 * A string that has parentheses around a specific string.
 */
export type StringParenthesized<Infix extends string> = StringSurroundedBy<
  "(",
  ")",
  Infix
>;

/**
 * A type guard for strings, to match a specific {@link RegExp} pattern.
 * The type guard is a function, but also has a `regex` property that contains the pattern.
 */
export type StringTypeGuard<T extends string> = TypeGuard<T> & {
  regex: RegExp;
};

/**
 * Creates a type guard for strings, to match strings that contain nothing but the given pattern or string.
 * @param value The pattern or string to match.
 * @returns A type guard for strings, to match strings that contain nothing but the given pattern or string.
 * @example
 * ```ts
 * const isOnlyHello = isOnly(/Hello/i);
 * console.log(isOnlyHello("Hello, world")); // false
 * console.log(isOnlyHello("Hello"));        // true
 * console.log(isOnlyHello("hellO"));        // true
 * ```
 */
export const isOnly: <T extends string>(
  value: RegExp | T,
) => StringTypeGuard<T> = <
  T extends string,
>(value: RegExp | T): StringTypeGuard<T> => {
  return matches(only(sequence(value))) as StringTypeGuard<T>;
};

export const contains: <Infix extends string>(
  prefix: RegExp | Infix,
) => StringTypeGuard<`${string}${Infix}${string}`> = <
  T extends string,
>(prefix: RegExp | T): StringTypeGuard<`${string}${T}${string}`> => {
  return matches(sequence(prefix)) as StringTypeGuard<`${string}${T}${string}`>;
};

export const startsWith: <T extends string>(
  prefix: RegExp | T,
) => StringTypeGuard<`${T}${string}`> = <
  T extends string,
>(prefix: RegExp | T): StringTypeGuard<`${T}${string}`> => {
  return matches(startWith(sequence(prefix))) as StringTypeGuard<
    `${T}${string}`
  >;
};

export function matches<T extends string>(
  regex: RegExp | T,
): StringTypeGuard<T> {
  const effectiveRegex = sequence(regex);
  return Object.assign(
    (x: unknown): boolean => isString(x) && effectiveRegex.test(x),
    { regex: effectiveRegex },
  ) as StringTypeGuard<T>;
}

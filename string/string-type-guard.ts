import { TypeGuard } from "../type-guard.ts";
import { isString } from "./is-string.ts";
import { endWith, only, sequence, startWith } from "./regex.ts";

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
 * Creates a type guard for strings, to match strings that contain nothing but the given pattern or string, exactly once.
 * @param expected The pattern or string that the strings should match exactly.
 * @returns A type guard for strings, to match strings that contain nothing but the given pattern or string, exactly once.
 * @example
 * ```ts
 * const isOnlyHello = isOnly(/Hello/i);
 * console.log(isOnlyHello("Hello, world")); // false
 * console.log(isOnlyHello("Hello"));        // true
 * console.log(isOnlyHello("hellO"));        // true
 * ```
 */
export const isOnly: <Only extends string>(
  expected: RegExp | Only,
) => StringTypeGuard<Only> = <
  Only extends string,
>(expected: RegExp | Only): StringTypeGuard<Only> => {
  return matches(only(sequence(expected))) as StringTypeGuard<Only>;
};

/**
 * Creates a type guard for strings, to match strings that contain the given pattern or string.
 * @param infix The pattern or string that the strings should contain.
 * @returns A type guard for strings, to match strings that contain the given pattern or string.
 * @example
 * ```ts
 * const containsO = contains(/o/);
 * console.log(containsO("Hello, world")); // true
 * console.log(containsO("Hello"));        // true
 * console.log(containsO("hellO"));        // false
 * ```
 */
export const contains: <Infix extends string>(
  infix: RegExp | Infix,
) => StringTypeGuard<StringContaining<Infix>> = <
  Infix extends string,
>(infix: RegExp | Infix): StringTypeGuard<StringContaining<Infix>> => {
  return matches(sequence(infix)) as StringTypeGuard<StringContaining<Infix>>;
};

/**
 * Creates a type guard for strings, to match strings that start with the given pattern or string.
 * @param prefix The pattern or string that the strings should start with.
 * @returns A type guard for strings, to match strings that start with the given pattern or string.
 * @example
 * ```ts
 * const startsWithH = startsWith(/h/);
 * console.log(startsWithO("hello"));        // true
 * console.log(startsWithO("world, hello")); // false
 * ```
 */
export const startsWith: <Prefix extends string>(
  prefix: RegExp | Prefix,
) => StringTypeGuard<StringStartingWith<Prefix>> = <
  Prefix extends string,
>(prefix: RegExp | Prefix): StringTypeGuard<StringStartingWith<Prefix>> => {
  return matches(startWith(sequence(prefix))) as StringTypeGuard<
    StringStartingWith<Prefix>
  >;
};

/**
 * Creates a type guard for strings, to match strings that end with the given pattern or string.
 * @param suffix The pattern or string that the strings should end with.
 * @returns A type guard for strings, to match strings that end with the given pattern or string.
 * @example
 * ```ts
 * const endsWithO = endsWith(/o/);
 * console.log(endsWithO("hello"));        // true
 * console.log(endsWithO("hello, world")); // false
 * ```
 */
export const endsWith: <Suffix extends string>(
  suffix: RegExp | Suffix,
) => StringTypeGuard<StringEndingWith<Suffix>> = <
  Suffix extends string,
>(suffix: RegExp | Suffix): StringTypeGuard<StringEndingWith<Suffix>> => {
  return matches(endWith(sequence(suffix))) as StringTypeGuard<
    StringEndingWith<Suffix>
  >;
};

/**
 * Creates a type guard for strings, to match a specific {@link RegExp} pattern.
 * @param regex The pattern that the strings should match.
 * @returns A type guard for strings, to match a specific {@link RegExp} pattern.
 * @example
 * ```ts
 * const hasHello = matches(/hello/i);
 * console.log(hasHello("Hello, world")); // true
 * console.log(hasHello("Hell, no"));     // false
 * ```
 */
export function matches<T extends string>(
  regex: RegExp | T,
): StringTypeGuard<T> {
  const effectiveRegex = sequence(regex);
  return Object.assign(
    (x: unknown): boolean => isString(x) && effectiveRegex.test(x),
    { regex: effectiveRegex },
  ) as StringTypeGuard<T>;
}

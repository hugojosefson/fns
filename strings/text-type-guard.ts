import { TypeGuard } from "../type-guard.ts";
import { isString } from "./is-string.ts";
import { only, sequence, startWith } from "./regex.ts";

export type StringTypeGuard<T extends string> = TypeGuard<T> & {
  regex: RegExp;
};

export const isOnly = <
  T extends string,
>(value: RegExp | T): StringTypeGuard<T> => {
  return matches(only(sequence(value))) as StringTypeGuard<T>;
};

export const contains: <T extends string>(
  prefix: RegExp | T,
) => StringTypeGuard<`${string}${T}${string}`> = <
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

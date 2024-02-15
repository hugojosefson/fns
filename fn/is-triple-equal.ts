import { TypeGuard } from "../type-guard/type-guard.ts";
import { Predicate } from "./predicate.ts";

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

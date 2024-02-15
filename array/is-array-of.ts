import { TypeGuard } from "../type-guard/type-guard.ts";

/**
 * A type guard for arrays, to match a specific item type.
 */
export function isArrayOf<T>(itemTypeGuard: TypeGuard<T>): TypeGuard<T[]> {
  return (value: unknown): value is T[] => {
    return Array.isArray(value) && value.every(itemTypeGuard);
  };
}

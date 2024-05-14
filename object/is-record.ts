import { isFunction } from "../fn/is-function.ts";
import { isTripleEqual } from "../fn/is-triple-equal.ts";
import { isString } from "../string/is-string.ts";
import { isOnly } from "../string/string-type-guard.ts";
import type { TypeGuard } from "../type-guard/type-guard.ts";
import { isNonNullObject } from "./is-non-null-object.ts";

/**
 * A type guard for objects, to match a specific property type.
 */
export type TypeGuardForObjectWithPropertyOfType<
  K extends string | symbol | number,
  V,
> = TypeGuard<Record<K, V>>;

/**
 * Creates a type guard for {@link Record}.
 * @param key Name of the property.
 * @param valueTypeGuard Type guard for the property value.
 * @returns A type guard for {@link Record}.
 */
export function createIsRecordWithProperty<
  K extends string | symbol | number,
  V,
>(
  key: K,
  valueTypeGuard: TypeGuard<V> | V,
): TypeGuardForObjectWithPropertyOfType<K, V> {
  return createIsRecord(key, valueTypeGuard);
}

export function createIsRecord<K extends string | symbol | number, V>(
  keyTypeGuard: TypeGuard<K> | K,
  valueTypeGuard: TypeGuard<V> | V,
): TypeGuard<Record<K, V>> {
  return (value: unknown): value is Record<K, V> => {
    if (!isNonNullObject(value)) {
      return false;
    }

    const effectiveValueTypeGuard: TypeGuard<V> =
      isFunction<TypeGuard<V>>(valueTypeGuard)
        ? valueTypeGuard as TypeGuard<V>
        : isString(valueTypeGuard)
        ? isOnly(valueTypeGuard)
        : isTripleEqual(valueTypeGuard);

    // keyTypeGuard is a function
    if (isFunction<TypeGuard<K>>(keyTypeGuard)) {
      // check that at least some key(s) match. use Array.some
      const matchingKeys = [
        ...Object.keys(value),
        ...Object.getOwnPropertySymbols(value),
        ...Object.keys(Object.getPrototypeOf(value)),
        ...Object.getOwnPropertySymbols(Object.getPrototypeOf(value)),
      ].filter(keyTypeGuard);
      if (matchingKeys.length === 0) {
        return false;
      }

      // for the keys that match, check that the values match
      const valuesToMatch: unknown[] = matchingKeys.map((key) =>
        (value as Record<K, V>)[key as K]
      );
      return valuesToMatch.every(effectiveValueTypeGuard);
    }

    // keyTypeGuard is an exact key
    return effectiveValueTypeGuard((value as Record<K, V>)[keyTypeGuard as K]);
  };
}

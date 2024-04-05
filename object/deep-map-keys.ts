import { Transformer } from "../fn/transformer.ts";

/**
 * Creates a new function that maps the keys of an object or array, recursively, using the provided function.
 * @param fn the function to map the keys with
 * @returns a new function that maps the keys of an object or array
 */
export function createDeepMapKeys(
  fn: Transformer<string, PropertyKey>,
) {
  /**
   * Recursively maps the keys of an object or array.
   * @param x the object or array to map
   * @returns the object or array with the keys mapped
   * @template U the return type
   * @template T the input type
   */
  function deepMapKeys<U extends unknown, T extends unknown = unknown>(
    x: T,
  ): U {
    if (Array.isArray(x)) {
      return x.map(deepMapKeys) as U;
    }

    if (typeof x === "object" && x !== null) {
      return Object.fromEntries(
        Object.entries(x).map(([key, value]) => [fn(key), deepMapKeys(value)]),
      ) as U;
    }

    return x as unknown as U;
  }

  return deepMapKeys;
}

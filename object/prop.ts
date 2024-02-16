import { Lookuper } from "../fn/transformer.ts";

/**
 * Creates a function that returns the value of the given key of the given object.
 * @param key The key to get the value of.
 * @returns A function that returns the value of the given key of the given object.
 * @example
 * const getLength = prop("length");
 * const names = ["Alice", "Bob", "Eve"];
 * const lengths = names.map(getLength);
 * console.log(lengths); // [5, 3, 3]
 */
export function prop<
  Obj extends Record<
    string | number | symbol,
    unknown
  >,
  K extends keyof Obj = keyof Obj,
  V extends Obj[K] = Obj[K],
>(key: K): Lookuper<Obj, V> {
  return (obj) => obj[key] as V;
}

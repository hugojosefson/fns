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
export function prop<T, K extends keyof T>(key: K): (x: T) => T[K] {
  return (x) => x[key];
}

/**
 * Converts an {@link Iterator<T>}, into an {@link Iterable<T>}.
 * @param input the input to convert
 * @returns an `Iterable` of items from the input
 */
export function intoIterableFromIterator<T>(
  input: Iterator<T>,
): Iterable<T> {
  return {
    [Symbol.iterator](): Iterator<T> {
      return input;
    },
  };
}

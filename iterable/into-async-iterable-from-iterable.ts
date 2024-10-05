/**
 * Converts an {@link Iterable<T>}, into an {@link AsyncIterable<T>}.
 * @param input the input to convert
 * @returns an {@link AsyncIterable<T>} of items from the input
 */
export function intoAsyncIterableFromIterable<T>(
  input: Iterable<T>,
): AsyncIterable<T> {
  return {
    [Symbol.asyncIterator](): AsyncIterator<T> {
      const iterator = input[Symbol.iterator]();
      return {
        next: () => Promise.resolve(iterator.next()),
      };
    },
  };
}

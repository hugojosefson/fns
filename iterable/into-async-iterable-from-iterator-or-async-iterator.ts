/**
 * Converts an {@link Iterator<T>} or {@link AsyncIterator<T>}, into an {@link AsyncIterable<T>}.
 * @param input the input to convert
 * @returns an {@link AsyncIterable<T>} of items from the input
 */
export function intoAsyncIterableFromIteratorOrAsyncIterator<T>(
  input:
    | Iterator<T>
    | AsyncIterator<T>,
): AsyncIterable<T> {
  return {
    [Symbol.asyncIterator](): AsyncIterator<T> {
      return {
        next: async () => await input.next(),
      };
    },
  };
}

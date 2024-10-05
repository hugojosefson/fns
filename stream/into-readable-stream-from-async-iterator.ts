/**
 * Converts an {@link AsyncIterator<T>} into a {@link ReadableStream<T>}.
 * @param input the `AsyncIterator` to convert
 * @returns a `ReadableStream` that pulls from the `AsyncIterator`
 */
export function intoReadableStreamFromAsyncIterator<T>(
  input: AsyncIterator<T>,
): ReadableStream<T> {
  return new ReadableStream<T>({
    async pull(controller) {
      const { done, value } = await input.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

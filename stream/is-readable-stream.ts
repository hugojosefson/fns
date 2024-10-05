/**
 * Type guard to determine if an input is a {@link ReadableStream<T>}.
 * @param input the input to check
 * @returns `true` if the input is a `ReadableStream<T>`, `false` otherwise
 */
export function isReadableStream<T>(
  input: unknown,
): input is ReadableStream<T> {
  return input instanceof ReadableStream;
}

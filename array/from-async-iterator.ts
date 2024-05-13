import { intoAsyncIterable } from "../iterable/into-async-iterable.ts";

/**
 * Converts an {@link AsyncIterableIterator}, {@link AsyncIterator}, or {@link AsyncIterable} to an {@link Array}.
 * @param asyncIterator The async iterator to convert.
 * @returns The array of items from the async iterator.
 */
export async function fromAsyncIterator<T>(
  asyncIterator: AsyncIterator<T> | AsyncIterableIterator<T> | AsyncIterable<T>,
): Promise<T[]> {
  const asyncIterable: AsyncIterable<T> = intoAsyncIterable(asyncIterator);
  return await Array.fromAsync(asyncIterable) as T[];
}

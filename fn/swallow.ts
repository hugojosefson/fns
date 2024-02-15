/**
 * Use this with `Promise.prototype.catch` to swallow errors of a specific type.
 * @example
 * ```ts
 * const contents: string|undefined = await Deno.readTextFile("foo.txt").catch(swallow(Deno.errors.NotFound));
 * ```
 * @example
 * ```ts
 * const contents: string = await Deno.readTextFile("foo.txt").catch(swallow(Deno.errors.NotFound, "Sorry :( no file found"));
 * ```
 * @param errorType the type of error to swallow
 * @param defaultValue the value to return if the error is swallowed
 */
export function swallow<
  E extends Error,
  T,
  A extends unknown[] = unknown[],
>(
  errorType: new (...args: A) => E,
  defaultValue: T = undefined as unknown as T,
): (reason: Error | unknown) => Promise<T> {
  return (reason) => {
    if (reason instanceof errorType) {
      return Promise.resolve(defaultValue);
    }
    return Promise.reject(reason);
  };
}

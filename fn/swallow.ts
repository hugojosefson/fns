import type { Getter } from "./getter.ts";
import { isFunction } from "./is-function.ts";

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
 *
 * @example
 * ```ts
 * const contents: string = await Deno.readTextFile("foo.txt").catch(swallow(Deno.errors.NotFound, () => "Sorry :( no file found"));
 * ```
 * @param errorType the type of error to swallow
 * @param defaultGetterOrValue the {@link Getter} function to call for a default value, or default value to return if the error is swallowed
 */
export function swallow<
  E extends Error,
  T,
  A extends unknown[] = unknown[],
>(
  errorType: new (...args: A) => E,
  defaultGetterOrValue: Getter<T> | T = undefined as T,
): (reason: Error | unknown) => Promise<T> {
  return (reason) => {
    // don't swallow other errors
    if (!(reason instanceof errorType)) {
      return Promise.reject(reason);
    }

    // if default is a function, call it
    if (isFunction(defaultGetterOrValue)) {
      return Promise.resolve(defaultGetterOrValue());
    }
    return Promise.resolve(defaultGetterOrValue);
  };
}

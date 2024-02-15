/**
 * A type guard for functions.
 * @param value The value to check
 * @returns Whether the value is a function
 */
export function isFunction<T extends (...args: unknown[]) => unknown>(
  value: unknown,
  // deno-lint-ignore ban-types
): value is T & Function {
  return typeof value === "function";
}

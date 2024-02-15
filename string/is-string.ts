/**
 * Check if the value is a string
 * @param value The value to check
 * @returns Whether the value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Returns true if the given value is a non-null object.
 * @param value the value to check
 * @returns true if the given value is a non-null object
 */
export function isNonNullObject(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

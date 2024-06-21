/**
 * Sorts strings, and removes any duplicates.
 * @param strings The strings to sort and remove duplicates from.
 * @returns The sorted strings, with duplicates removed.
 */
export function sortUnique<T extends string>(strings: T[]): T[] {
  return [...(new Set(strings)).values()].sort() as T[];
}

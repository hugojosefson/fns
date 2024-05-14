/**
 * Stringify pretty-printed JSON.
 */
export const ss = (x: unknown): string => JSON.stringify(x, null, 2);

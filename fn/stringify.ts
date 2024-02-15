/**
 * Converts a function's return value to a string. This function takes in a function that returns a value,
 * and returns a new function that converts the result of the input function to a string.
 * @param fn the function whose return value is to be converted to a string
 * @returns a function that converts the result of the input function to a string
 */
export function stringify<T>(fn: (x: T) => unknown): (x: T) => string {
  return (x) => `${fn(x)}`;
}

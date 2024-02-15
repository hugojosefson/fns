/**
 * A string that starts with a specific string.
 */
export type StringStartingWith<Prefix extends string> = `${Prefix}${string}`;

/**
 * A string that contains a specific string.
 */
export type StringContaining<Infix extends string> = `{string}${Infix}{string}`;

/**
 * A string that ends with a specific string.
 */
export type StringEndingWith<Suffix extends string> = `${string}${Suffix}`;

/**
 * A string that starts with a specific string, and ends with a specific string.
 */
export type StringSurroundedBy<
  Prefix extends string,
  Suffix extends string,
  Infix extends string = string,
> = `${Prefix}${string}${Suffix}`;

/**
 * A string that has parentheses around a specific string.
 */
export type StringParenthesized<Infix extends string> = StringSurroundedBy<
  "(",
  ")",
  Infix
>;

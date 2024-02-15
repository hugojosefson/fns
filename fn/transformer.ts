/**
 * A function that takes an input of type T and returns a value of type R.
 */
export type Transformer<T, R> = (value: T) => R;
/**
 * A function that looks up a value of type V by a key of type K.
 */
export type Lookuper<K, V> = Transformer<K, V>;
/**
 * A function that takes an input of type T and returns a value of type R, or a promise of a value of type R.
 */
export type AsyncTransformer<T, R> = (value: T) => Promise<R> | R;

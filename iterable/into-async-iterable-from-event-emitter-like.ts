import type { EventEmitterLike } from "./event-emitter-like.ts";

/**
 * Converts an {@link EventEmitterLike<T>}, into a {@link ReadableStream<T>}.
 * @param input the input to convert
 * @returns a `ReadableStream` of items from the input
 */
export function intoAsyncIterableFromEventEmitterLike<T>(
  input: EventEmitterLike<T>,
): ReadableStream<T> {
  return new ReadableStream<T>({
    start(controller) {
      input.on("data", (data: T) => {
        controller.enqueue(data);
      });
      input.on("end", () => {
        controller.close();
      });
      input.on("error", (err: unknown) => {
        controller.error(err);
      });
    },
  });
}

import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/assert-equals";
import type { AsyncTransformer, Lookuper, Transformer } from "./transformer.ts";

describe("Transformer", () => {
  it("should transform the input value to the output value", () => {
    const transformer: Transformer<number, string> = (value) =>
      value.toString();
    assertEquals(transformer(5), "5");
  });
});

describe("Lookuper", () => {
  it("should lookup the value by the key", () => {
    const lookuper: Lookuper<string, number> = (key) => key.length;
    assertEquals(lookuper("test"), 4);
  });
});

describe("AsyncTransformer", () => {
  it("should transform the input value to the output value asynchronously", async () => {
    const asyncTransformer: AsyncTransformer<number, string> = (value) =>
      Promise.resolve(
        value.toString(),
      );
    assertEquals(await asyncTransformer(5), "5");
  });
});

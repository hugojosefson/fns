import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import { stringify } from "./stringify.ts";

describe("stringify", () => {
  it("should return '5' when the input function returns 5", () => {
    const double = (x: number) => 2 * x;
    const stringifiedDouble = stringify(double);
    assertEquals(stringifiedDouble(2.5), "5");
  });

  it("should return 'test' when the input function returns 'test'", () => {
    const fn = (x: string) => x;
    const stringifiedFn = stringify(fn);
    assertEquals(stringifiedFn("test"), "test");
  });
});

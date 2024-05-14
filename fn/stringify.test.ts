import { describe, it } from "https://deno.land/std@0.224.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
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

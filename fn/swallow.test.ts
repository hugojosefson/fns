import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.221.0/assert/assert_equals.ts";
import { swallow } from "./swallow.ts";

describe("swallow", () => {
  it("should return default value when the error is of the specified type", async () => {
    const errorFn = () => Promise.reject(new Error());
    const swallowedFn = errorFn().catch(swallow(Error, "default"));
    assertEquals(await swallowedFn, "default");
  });

  it("should throw the error when it is not of the specified type", async () => {
    const errorFn = () => Promise.reject(new TypeError());
    const swallowedFn = errorFn().catch(swallow(Error, "default"));
    try {
      await swallowedFn;
    } catch (error) {
      assertEquals(error instanceof TypeError, true);
    }
  });
});

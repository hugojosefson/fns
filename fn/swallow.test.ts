import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/assert-equals";
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

  it("should call any Getter function if given as default value", async () => {
    const errorFn = () => Promise.reject(new Error());
    const swallowedFn = errorFn().catch(swallow(Error, () => "default"));
    assertEquals(await swallowedFn, "default");
  });
});

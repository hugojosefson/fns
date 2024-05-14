import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/assert-equals";
import { not, notAsync } from "./not.ts";

describe("not", () => {
  it("should return false when the input function returns true", () => {
    const fn = (x: boolean) => x;
    const notFn = not(fn);
    assertEquals(notFn(true), false);
  });

  it("should return true when the input function returns false", () => {
    const fn = (x: boolean) => x;
    const notFn = not(fn);
    assertEquals(notFn(false), true);
  });
});

describe("notAsync", () => {
  it("should return false when the input async function returns true", async () => {
    const fn = (x: boolean) => Promise.resolve(x);
    const notFn = notAsync(fn);
    assertEquals(await notFn(true), false);
  });

  it("should return true when the input async function returns false", async () => {
    const fn = (x: boolean) => Promise.resolve(x);
    const notFn = notAsync(fn);
    assertEquals(await notFn(false), true);
  });
});

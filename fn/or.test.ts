import { describe, it } from "https://deno.land/std@0.216.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.216.0/assert/assert_equals.ts";
import { or, orAsync } from "./or.ts";

describe("or", () => {
  it("should return true when any input function returns true", () => {
    const fn1 = (x: boolean) => x;
    const fn2 = (x: boolean) => !x;
    const orFn = or(fn1, fn2);
    assertEquals(orFn(true), true);
    assertEquals(orFn(false), true);
  });

  it("should return false when all input functions return false", () => {
    const fn1 = (x: boolean) => x;
    const fn2 = (x: boolean) => x;
    const orFn = or(fn1, fn2);
    assertEquals(orFn(false), false);
  });
});

describe("orAsync", () => {
  it("should return true when any input async function returns true", async () => {
    const fn1 = (x: boolean) => Promise.resolve(x);
    const fn2 = (x: boolean) => Promise.resolve(!x);
    const orFn = orAsync(fn1, fn2);
    assertEquals(await orFn(true), true);
    assertEquals(await orFn(false), true);
  });

  it("should return false when all input async functions return false", async () => {
    const fn1 = (x: boolean) => Promise.resolve(x);
    const fn2 = (x: boolean) => Promise.resolve(x);
    const orFn = orAsync(fn1, fn2);
    assertEquals(await orFn(false), false);
  });
});

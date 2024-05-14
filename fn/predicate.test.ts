import { describe, it } from "https://deno.land/std@0.224.0/testing/bdd.ts";
import { AsyncPredicate, Predicate } from "./predicate.ts";

describe("Predicate", () => {
  it("const a: Predicate<number> = (value) => value > 5; should return true for value > 5", () => {
    const a: Predicate<number> = (value) => value > 5;
    if (a(6) !== true) {
      throw new Error("Test failed");
    }
  });

  it("const b: Predicate<string> = (value) => value === 'test'; should return true for value 'test'", () => {
    const b: Predicate<string> = (value) => value === "test";
    if (b("test") !== true) {
      throw new Error("Test failed");
    }
  });
});

describe("AsyncPredicate", () => {
  it("const a: AsyncPredicate<number> = async (value) => value > 5; should return true for value > 5", async () => {
    const a: AsyncPredicate<number> = (value) => Promise.resolve(value > 5);
    if ((await a(6)) !== true) {
      throw new Error("Test failed");
    }
  });

  it("const b: AsyncPredicate<string> = async (value) => value === 'test'; should return true for value 'test'", async () => {
    const b: AsyncPredicate<string> = (value) =>
      Promise.resolve(value === "test");
    if ((await b("test")) !== true) {
      throw new Error("Test failed");
    }
  });
});

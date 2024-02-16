import { describe, it } from "https://deno.land/std@0.216.0/testing/bdd.ts";
import { assert } from "https://deno.land/std@0.216.0/assert/assert.ts";
import {
  contains,
  endsWith,
  isOnly,
  matches,
  startsWith,
} from "./string-type-guard.ts";

describe("string-type-guard", () => {
  describe("isOnly", () => {
    it("should return true for strings that match the pattern exactly", () => {
      const isOnlyHello = isOnly(/Hello/i);
      assert(isOnlyHello("Hello"));
      assert(!isOnlyHello("Hello, world"));
    });
  });

  describe("contains", () => {
    it("should return true for strings that contain the pattern", () => {
      const containsO = contains(/o/);
      assert(containsO("Hello, world"));
      assert(!containsO("Hell"));
    });
  });

  describe("startsWith", () => {
    it("should return true for strings that start with the pattern", () => {
      const startsWithH = startsWith(/h/);
      assert(startsWithH("hello"));
      assert(!startsWithH("world, hello"));
    });
  });

  describe("endsWith", () => {
    it("should return true for strings that end with the pattern", () => {
      const endsWithO = endsWith(/o/);
      assert(endsWithO("hello"));
      assert(!endsWithO("hello, world"));
    });
  });

  describe("matches", () => {
    it("should return true for strings that match the pattern", () => {
      const hasHello = matches(/hello/i);
      assert(hasHello("Hello, world"));
      assert(!hasHello("Hell, no"));
    });
  });
});

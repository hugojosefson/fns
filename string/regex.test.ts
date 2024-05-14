import { describe, it } from "https://deno.land/std@0.224.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import {
  capture,
  caseInsensitive,
  endWith,
  global,
  groups,
  only,
  optional,
  or,
  sequence,
  startWith,
  unicode,
} from "./regex.ts";

describe("regex", () => {
  describe("startWith", () => {
    it("should prefix a regex with ^", () => {
      const regex = startWith(/a/);
      assertEquals(regex.source, "^a");
    });
  });

  describe("endWith", () => {
    it("should suffix a regex with $", () => {
      const regex = endWith(/a/);
      assertEquals(regex.source, "a$");
    });
  });

  describe("only", () => {
    it("should surround a regex with ^ and $", () => {
      const regex = only(/a/);
      assertEquals(regex.source, "^a$");
    });
  });

  describe("or", () => {
    it("should return a regex that matches any of the given regexes", () => {
      const regex = or(/a/, /b/);
      assertEquals(regex.source, "a|b");
    });
  });

  describe("sequence", () => {
    it("should return a regex that matches all given regexes in sequence", () => {
      const regex = sequence(/a/, /b/, /c/);
      assertEquals(regex.source, "abc");
    });
  });

  describe("optional", () => {
    it("should return a regex that matches the given regex or nothing", () => {
      const regex = optional(/a/);
      assertEquals(regex.source, "(a)?");
    });
  });

  describe("global", () => {
    it("should return a regex with the global flag set", () => {
      const regex = global(/a/);
      assertEquals(regex.flags.includes("g"), true);
    });
  });

  describe("caseInsensitive", () => {
    it("should return a regex with the case-insensitive flag set", () => {
      const regex = caseInsensitive(/a/);
      assertEquals(regex.flags.includes("i"), true);
    });
  });

  describe("unicode", () => {
    it("should return a regex with the unicode flag set", () => {
      const regex = unicode(/a/);
      assertEquals(regex.flags.includes("u"), true);
    });
  });

  describe("capture", () => {
    it("should return a regex with a named capture group", () => {
      const regex = capture("a", /a/);
      assertEquals(regex.source, "(?<a>a)");
    });
  });

  describe("groups", () => {
    it("should extract the captured groups from the args of a replacer function", () => {
      const result = "abc".replace(
        /(?<a>a)(?<b>b)(?<c>c)/,
        (_match, ...args) => {
          const { a, b, c } = groups(args);
          return `${a}-${b}-${c}`;
        },
      );
      assertEquals(result, "a-b-c");
    });
  });
});

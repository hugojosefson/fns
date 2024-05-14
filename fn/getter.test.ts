import { describe, it } from "@std/testing/bdd";
import type { Getter } from "./getter.ts";

describe("Getter", () => {
  it("const a: Getter<number> = () => 5; should compile", () => {
    const _a: Getter<number> = () => 5;
  });

  it("const b: Getter<string> = () => 'test'; should compile", () => {
    const _b: Getter<string> = () => "test";
  });
});

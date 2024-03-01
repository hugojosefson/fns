import { describe, it } from "https://deno.land/std@0.218.2/testing/bdd.ts";
import { Getter } from "./getter.ts";

describe("Getter", () => {
  it("const a: Getter<number> = () => 5; should compile", () => {
    const _a: Getter<number> = () => 5;
  });

  it("const b: Getter<string> = () => 'test'; should compile", () => {
    const _b: Getter<string> = () => "test";
  });
});

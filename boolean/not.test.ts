import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts";
import { Not } from "./not.ts";

describe("Not", () => {
  it("const a: Not<true> = false; should compile", () => {
    const _a: Not<true> = false;
  });

  it("const b: Not<false> = true; should compile", () => {
    const _b: Not<false> = true;
  });
});

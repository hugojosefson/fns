import { describe, it } from "@std/testing/bdd";
import type { Not } from "./not.ts";

describe("Not", () => {
  it("const a: Not<true> = false; should compile", () => {
    const _a: Not<true> = false;
  });

  it("const b: Not<false> = true; should compile", () => {
    const _b: Not<false> = true;
  });
});

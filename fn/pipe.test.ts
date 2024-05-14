import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/assert-equals";
import { pipe, pipeAsync } from "./pipe.ts";

describe("pipe", () => {
  it("should correctly apply the input functions from right to left", () => {
    const addOne = (x: number) => x + 1;
    const multiplyByTwo = (x: number) => x * 2;
    const pipeFn = pipe(addOne, multiplyByTwo);
    assertEquals(pipeFn(2), 6);
  });

  it("should return the input value if no functions are provided", () => {
    const pipeFn = pipe();
    assertEquals(pipeFn(2), 2);
  });
});

describe("pipeAsync", () => {
  it("should correctly apply the input async functions from right to left", async () => {
    const addOne = (x: number) => Promise.resolve(x + 1);
    const multiplyByTwo = (x: number) => Promise.resolve(x * 2);
    const pipeFn = pipeAsync(addOne, multiplyByTwo);
    assertEquals(await pipeFn(2), 6);
  });

  it("should return the input value if no functions are provided", async () => {
    const pipeFn = pipeAsync();
    assertEquals(await pipeFn(2), 2);
  });
});

import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.221.0/assert/assert_equals.ts";
import { isNumber } from "../number/is-number.ts";
import { createIsRecord } from "./is-record.ts";

describe("createIsRecord", () => {
  it("should return true for records with matching key and value types", () => {
    const isRecordWithNumberProperty = createIsRecord("num", isNumber);
    const record = { num: 5 };
    assertEquals(isRecordWithNumberProperty(record), true);
  });

  it("should return false for records without matching key and value types", () => {
    const isRecordWithNumberProperty = createIsRecord("num", isNumber);
    const record = { num: "5" };
    assertEquals(isRecordWithNumberProperty(record), false);
  });

  it("should return false for non-records", () => {
    const isRecordWithNumberProperty = createIsRecord("num", isNumber);
    const nonRecord = 5;
    assertEquals(isRecordWithNumberProperty(nonRecord), false);
  });

  it("should return false for null", () => {
    const isRecordWithNumberProperty = createIsRecord("num", isNumber);
    const nullValue = null;
    assertEquals(isRecordWithNumberProperty(nullValue), false);
  });

  it("should return false for undefined", () => {
    const isRecordWithNumberProperty = createIsRecord("num", isNumber);
    const undefinedValue = undefined;
    assertEquals(isRecordWithNumberProperty(undefinedValue), false);
  });

  it("should return false for arrays", () => {
    const isRecordWithNumberProperty = createIsRecord("num", isNumber);
    const array = [5];
    assertEquals(isRecordWithNumberProperty(array), false);
  });

  it("should return false for functions", () => {
    const isRecordWithNumberProperty = createIsRecord("num", isNumber);
    const func = () => {};
    assertEquals(isRecordWithNumberProperty(func), false);
  });

  it("should return false for strings", () => {
    const isRecordWithNumberProperty = createIsRecord("num", isNumber);
    const str = "test";
    assertEquals(isRecordWithNumberProperty(str), false);
  });

  it("should return false for booleans", () => {
    const isRecordWithNumberProperty = createIsRecord("num", isNumber);
    const bool = true;
    assertEquals(isRecordWithNumberProperty(bool), false);
  });
});

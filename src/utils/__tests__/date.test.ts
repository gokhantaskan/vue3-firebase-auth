import dayjs from "dayjs";
import { describe, expect, test } from "vitest";

import { convertDateToMs } from "../date";

describe("convertDateToMs", () => {
  test("returns null when input is null", () => {
    expect(convertDateToMs(null)).toBeNull();
  });

  test("returns null when input is undefined", () => {
    expect(convertDateToMs(undefined)).toBeNull();
  });

  test("returns null when input is an invalid date string", () => {
    expect(convertDateToMs("test")).toBeNull();
  });

  test("returns null when input is an invalid dayjs instance", () => {
    expect(convertDateToMs(dayjs(null))).toBeNull();
    expect(convertDateToMs(dayjs("test"))).toBeNull();
  });

  test("returns correct timestamp when input is a date string", () => {
    const dateStr = "2022-01-01T00:00:00Z";
    expect(convertDateToMs(dateStr)).toBe(Date.parse(dateStr));
  });

  test("returns correct timestamp when input is a date object", () => {
    const dateObj = new Date("2022-01-01T00:00:00Z");
    expect(convertDateToMs(dateObj)).toBe(dateObj.getTime());
  });

  test("returns correct timestamp when input is a timestamp", () => {
    const timestamp = Date.now();
    expect(convertDateToMs(timestamp)).toBe(timestamp);
  });

  test("returns correct timestamp when input is a dayjs instance", () => {
    const dayjsObj = dayjs();
    expect(convertDateToMs(dayjsObj)).toBe(dayjsObj.valueOf());
  });
});

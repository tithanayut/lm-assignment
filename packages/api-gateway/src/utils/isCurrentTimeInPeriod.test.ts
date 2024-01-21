import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { isCurrentTimeInPeriod } from "./isCurrentTimeInPeriod";

describe("isCurrentTimeInPeriod", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return true if current time is in period", () => {
    const date = new Date(2023, 0, 21, 12, 0, 0); // 12:00
    vi.setSystemTime(date);

    const isInPeriod = isCurrentTimeInPeriod({ begin: "11:00", end: "13:00" });

    expect(isInPeriod).toBe(true);
  });

  it("should return false if current time is after period", () => {
    const date = new Date(2023, 0, 21, 14, 0, 0); // 12:00
    vi.setSystemTime(date);

    const isInPeriod = isCurrentTimeInPeriod({ begin: "11:00", end: "13:00" });

    expect(isInPeriod).toBe(false);
  });

  it("should return false if current time is before period", () => {
    const date = new Date(2023, 0, 21, 10, 0, 0); // 10:00
    vi.setSystemTime(date);

    const isInPeriod = isCurrentTimeInPeriod({ begin: "11:00", end: "13:00" });

    expect(isInPeriod).toBe(false);
  });

  it("should return true if current time is exactly at begin", () => {
    const date = new Date(2023, 0, 21, 11, 0, 0); // 11:00
    vi.setSystemTime(date);

    const isInPeriod = isCurrentTimeInPeriod({ begin: "11:00", end: "13:00" });

    expect(isInPeriod).toBe(true);
  });

  it("should return true if current time is exactly at end", () => {
    const date = new Date(2023, 0, 21, 13, 0, 0); // 13:00
    vi.setSystemTime(date);

    const isInPeriod = isCurrentTimeInPeriod({ begin: "11:00", end: "13:00" });

    expect(isInPeriod).toBe(true);
  });

  it("should return true if period is span across midnight and now is in period", () => {
    const date = new Date(2023, 0, 21, 3, 0, 0); // 03:00
    vi.setSystemTime(date);

    const isInPeriod = isCurrentTimeInPeriod({ begin: "22:00", end: "04:00" });

    expect(isInPeriod).toBe(true);
  });

  it("should return false if period is span across midnight and now is after period", () => {
    const date = new Date(2023, 0, 21, 6, 0, 0); // 06:00
    vi.setSystemTime(date);

    const isInPeriod = isCurrentTimeInPeriod({ begin: "22:00", end: "04:00" });

    expect(isInPeriod).toBe(false);
  });

  it("should return false if period is span across midnight and now is before period", () => {
    const date = new Date(2023, 0, 21, 20, 0, 0); // 20:00
    vi.setSystemTime(date);

    const isInPeriod = isCurrentTimeInPeriod({ begin: "22:00", end: "04:00" });

    expect(isInPeriod).toBe(false);
  });
});

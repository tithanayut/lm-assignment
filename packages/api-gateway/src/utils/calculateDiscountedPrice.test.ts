import { describe, expect, it, vi } from "vitest";

import { calculateDiscountedPrice } from "./calculateDiscountedPrice";

describe("calculateDiscountedPrice", () => {
  it("should return full price if no time period is specified", () => {
    const price = calculateDiscountedPrice({ fullPrice: 100, discountedPercent: 10 });

    expect(price).toBe(100);
  });

  it("should return full price if current time is not in period", async () => {
    const isCurrentTimeInPeriod = await import("../utils/isCurrentTimeInPeriod");
    vi.spyOn(isCurrentTimeInPeriod, "isCurrentTimeInPeriod").mockReturnValue(false);

    const price = calculateDiscountedPrice({
      fullPrice: 100,
      discountedPercent: 10,
      timePeriod: { begin: "11:00", end: "13:00" },
    });

    expect(price).toBe(100);
  });

  it("should return discounted price if current time is in period", async () => {
    const isCurrentTimeInPeriod = await import("../utils/isCurrentTimeInPeriod");
    vi.spyOn(isCurrentTimeInPeriod, "isCurrentTimeInPeriod").mockReturnValue(true);

    const price = calculateDiscountedPrice({
      fullPrice: 100,
      discountedPercent: 10,
      timePeriod: { begin: "11:00", end: "13:00" },
    });

    expect(price).toBe(90);
  });
});

import { isCurrentTimeInPeriod } from "./isCurrentTimeInPeriod";

interface Menu {
  fullPrice: number;
  discountedPercent: number;
  timePeriod?: {
    begin: string;
    end: string;
  };
}

export function calculateDiscountedPrice(menu: Menu) {
  const { fullPrice, discountedPercent, timePeriod } = menu;
  if (typeof timePeriod === "undefined") return fullPrice;
  if (!isCurrentTimeInPeriod(timePeriod)) return fullPrice;
  return fullPrice * (1 - discountedPercent / 100);
}

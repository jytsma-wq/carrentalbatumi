import { describe, expect, it } from "vitest";

import { calculateDailyRateGel, quoteRental } from "./pricing";

describe("pricing", () => {
  it("uses the high-season 1-day rate in July and keeps deposit separate", () => {
    const quote = quoteRental({
      pickupDate: "2026-07-10",
      pickupTime: "10:00",
      returnDate: "2026-07-11",
      returnTime: "10:00",
    });

    expect(quote.dailyRateGel).toBe(150);
    expect(quote.rentalDays).toBe(1);
    expect(quote.rentalPriceGel).toBe(150);
    expect(quote.depositAmountGel).toBe(300);
    expect(quote.totalDueBeforeDepositGel).toBe(150);
  });

  it("uses low-season 8-15 day pricing in November", () => {
    expect(calculateDailyRateGel("2026-11-10", 8)).toBe(80);
  });

  it("adds the configured night delivery surcharge when pickup is overnight", () => {
    const quote = quoteRental({
      pickupDate: "2026-05-02",
      pickupTime: "23:30",
      returnDate: "2026-05-05",
      returnTime: "10:00",
    });

    expect(quote.nightSurchargeGel).toBe(30);
    expect(quote.totalDueBeforeDepositGel).toBe(
      quote.rentalPriceGel + quote.deliveryFeeGel + 30,
    );
  });
});

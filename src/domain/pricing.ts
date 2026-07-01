import { defaultPricingRules, defaultSettings } from "./defaults";

type QuoteInput = {
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  pickupLocationType?: string;
};

export type RentalQuote = {
  dailyRateGel: number;
  rentalDays: number;
  rentalPriceGel: number;
  depositAmountGel: number;
  deliveryFeeGel: number;
  nightSurchargeGel: number;
  totalDueBeforeDepositGel: number;
};

function toDateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00`);
}

function monthDayValue(month: number, day: number) {
  return month * 100 + day;
}

function isDateInRule(
  date: string,
  rule: (typeof defaultPricingRules)[number],
) {
  const parsed = new Date(`${date}T00:00:00`);
  const value = monthDayValue(parsed.getMonth() + 1, parsed.getDate());
  const start = monthDayValue(rule.startMonth, rule.startDay);
  const end = monthDayValue(rule.endMonth, rule.endDay);

  if (start <= end) {
    return value >= start && value <= end;
  }

  return value >= start || value <= end;
}

export function calculateRentalDays(input: QuoteInput) {
  const pickup = toDateTime(input.pickupDate, input.pickupTime);
  const dropoff = toDateTime(input.returnDate, input.returnTime);
  const milliseconds = dropoff.getTime() - pickup.getTime();

  return Math.max(1, Math.ceil(milliseconds / 86_400_000));
}

export function calculateDailyRateGel(pickupDate: string, rentalDays: number) {
  const rule = defaultPricingRules.find(
    (pricingRule) =>
      isDateInRule(pickupDate, pricingRule) &&
      rentalDays >= pricingRule.minDays &&
      rentalDays <= pricingRule.maxDays,
  );

  if (rule) {
    return rule.dailyPriceGel;
  }

  const fallback = defaultPricingRules.find(
    (pricingRule) => isDateInRule(pickupDate, pricingRule) && rentalDays >= 16,
  );

  return fallback?.dailyPriceGel ?? 150;
}

function isNightDelivery(time: string) {
  const [hourPart] = time.split(":");
  const hour = Number(hourPart);

  return (
    hour >= defaultSettings.nightSurchargeStartHour ||
    hour < defaultSettings.nightSurchargeEndHour
  );
}

export function quoteRental(input: QuoteInput): RentalQuote {
  const rentalDays = calculateRentalDays(input);
  const dailyRateGel = calculateDailyRateGel(input.pickupDate, rentalDays);
  const deliveryFeeGel = 0;
  const nightSurchargeGel = isNightDelivery(input.pickupTime)
    ? defaultSettings.nightSurchargeGel
    : 0;
  const rentalPriceGel = rentalDays * dailyRateGel;

  return {
    dailyRateGel,
    rentalDays,
    rentalPriceGel,
    depositAmountGel: defaultSettings.depositAmountGel,
    deliveryFeeGel,
    nightSurchargeGel,
    totalDueBeforeDepositGel:
      rentalPriceGel + deliveryFeeGel + nightSurchargeGel,
  };
}

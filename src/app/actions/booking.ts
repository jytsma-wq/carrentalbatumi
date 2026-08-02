"use server";

import { redirect } from "next/navigation";

import {
  bookingRequestSchema,
  normalizeBookingFormData,
} from "@/domain/booking-validation";
import { quoteRental } from "@/domain/pricing";
import { defaultLocale, isLocale } from "@/i18n/config";
import { saveBookingRequest } from "@/server/booking-store";

export async function submitBookingRequest(
  _previousState: { status: string; errorCode: string },
  formData: FormData,
) {
  const localeValue = formData.get("locale");
  const locale =
    typeof localeValue === "string" && isLocale(localeValue)
      ? localeValue
      : defaultLocale;
  const honeypot = formData.get("website");

  if (typeof honeypot === "string" && honeypot.trim()) {
    redirect(`/${locale}/request-received`);
  }

  const normalized = normalizeBookingFormData(Object.fromEntries(formData));
  const parsed = bookingRequestSchema.safeParse(normalized);

  if (!parsed.success) {
    return {
      status: "error",
      errorCode: "validation",
    };
  }

  const quote = quoteRental({
    pickupDate: parsed.data.pickupDate,
    pickupTime: parsed.data.pickupTime,
    returnDate: parsed.data.returnDate,
    returnTime: parsed.data.returnTime,
    pickupLocationType: parsed.data.pickupLocationType,
  });

  await saveBookingRequest({
    input: parsed.data,
    language: locale,
    quote,
  });

  redirect(`/${locale}/request-received`);
}

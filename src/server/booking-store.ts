import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import type { BookingRequestInput } from "@/domain/booking-validation";
import type { RentalQuote } from "@/domain/pricing";

type StoredBookingRequest = BookingRequestInput & {
  id: string;
  status: "pending";
  language: string;
  quotedRentalPriceGel: number;
  depositAmountGel: number;
  deliveryFeeGel: number;
  nightSurchargeGel: number;
  termsAcceptedAt: string;
  createdAt: string;
  updatedAt: string;
};

const storePath = path.join(process.cwd(), ".data", "booking-requests.json");

async function readExistingBookings() {
  try {
    return JSON.parse(
      await readFile(storePath, "utf8"),
    ) as StoredBookingRequest[];
  } catch {
    return [];
  }
}

export async function saveBookingRequest({
  input,
  language,
  quote,
}: {
  input: BookingRequestInput;
  language: string;
  quote: RentalQuote;
}) {
  const now = new Date().toISOString();
  const bookings = await readExistingBookings();
  const booking: StoredBookingRequest = {
    ...input,
    id: randomUUID(),
    status: "pending",
    language,
    quotedRentalPriceGel: quote.rentalPriceGel,
    depositAmountGel: quote.depositAmountGel,
    deliveryFeeGel: quote.deliveryFeeGel,
    nightSurchargeGel: quote.nightSurchargeGel,
    termsAcceptedAt: now,
    createdAt: now,
    updatedAt: now,
  };

  await mkdir(path.dirname(storePath), { recursive: true });
  await writeFile(
    storePath,
    JSON.stringify([...bookings, booking], null, 2),
    "utf8",
  );

  return booking.id;
}

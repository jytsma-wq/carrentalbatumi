import { z } from "zod";

import { defaultSettings } from "./defaults";

const locationTypes = [
  "batumi_airport",
  "hotel",
  "apartment",
  "city_address",
  "other",
] as const;

const preferredMessengers = ["whatsapp", "telegram", "phone", "email"] as const;

function dateTimeValue(date: string, time: string) {
  return new Date(`${date}T${time}:00`).getTime();
}

export const bookingRequestSchema = z
  .object({
    pickupDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    pickupTime: z.string().regex(/^\d{2}:\d{2}$/),
    returnDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    returnTime: z.string().regex(/^\d{2}:\d{2}$/),
    pickupLocationType: z.enum(locationTypes),
    pickupLocationText: z.string().trim().min(2).max(200),
    dropoffLocationType: z.enum(locationTypes),
    dropoffLocationText: z.string().trim().min(2).max(200),
    customerName: z.string().trim().min(2).max(120),
    customerPhone: z.string().trim().min(5).max(40),
    preferredMessenger: z.enum(preferredMessengers),
    customerEmail: z.email().max(160),
    driverAge: z.coerce.number().int().min(defaultSettings.minimumDriverAge),
    drivingExperienceYears: z.coerce
      .number()
      .int()
      .min(defaultSettings.minimumDrivingExperienceYears),
    licenceCountry: z.string().trim().min(2).max(80),
    plannedRoute: z.string().trim().min(2).max(500),
    wantsCrossBorder: z.coerce.boolean(),
    acceptsTerms: z.literal(true),
    flightNumber: z.string().trim().max(40).optional(),
    hotelOrApartmentName: z.string().trim().max(120).optional(),
    passengersCount: z.coerce.number().int().min(1).max(5).optional(),
    luggageCount: z.coerce.number().int().min(0).max(6).optional(),
    childSeatNeeded: z.coerce.boolean().optional(),
    message: z.string().trim().max(1000).optional(),
  })
  .superRefine((value, context) => {
    const pickup = dateTimeValue(value.pickupDate, value.pickupTime);
    const dropoff = dateTimeValue(value.returnDate, value.returnTime);

    if (dropoff <= pickup) {
      context.addIssue({
        code: "custom",
        message: "Return date and time must be after pickup date and time.",
        path: ["returnDate"],
      });
    }
  });

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;

type RawBookingFormData = Record<string, FormDataEntryValue | undefined>;

function textValue(value: FormDataEntryValue | undefined) {
  return typeof value === "string" ? value : undefined;
}

function numberValue(value: FormDataEntryValue | undefined) {
  const text = textValue(value);

  if (!text) {
    return undefined;
  }

  return Number(text);
}

function checkboxValue(value: FormDataEntryValue | undefined) {
  return value === "on" || value === "true" || value === "yes";
}

function yesNoValue(value: FormDataEntryValue | undefined) {
  return value === "yes" || value === "true";
}

export function normalizeBookingFormData(raw: RawBookingFormData) {
  return {
    pickupDate: textValue(raw.pickupDate),
    pickupTime: textValue(raw.pickupTime),
    returnDate: textValue(raw.returnDate),
    returnTime: textValue(raw.returnTime),
    pickupLocationType: textValue(raw.pickupLocationType),
    pickupLocationText: textValue(raw.pickupLocationText),
    dropoffLocationType: textValue(raw.dropoffLocationType),
    dropoffLocationText: textValue(raw.dropoffLocationText),
    customerName: textValue(raw.customerName),
    customerPhone: textValue(raw.customerPhone),
    preferredMessenger: textValue(raw.preferredMessenger),
    customerEmail: textValue(raw.customerEmail),
    driverAge: numberValue(raw.driverAge),
    drivingExperienceYears: numberValue(raw.drivingExperienceYears),
    licenceCountry: textValue(raw.licenceCountry),
    plannedRoute: textValue(raw.plannedRoute),
    wantsCrossBorder: yesNoValue(raw.wantsCrossBorder),
    acceptsTerms: checkboxValue(raw.acceptsTerms),
    flightNumber: textValue(raw.flightNumber),
    hotelOrApartmentName: textValue(raw.hotelOrApartmentName),
    passengersCount: numberValue(raw.passengersCount),
    luggageCount: numberValue(raw.luggageCount),
    childSeatNeeded: checkboxValue(raw.childSeatNeeded),
    message: textValue(raw.message),
  };
}

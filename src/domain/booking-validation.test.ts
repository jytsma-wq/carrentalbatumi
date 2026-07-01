import { describe, expect, it } from "vitest";

import {
  bookingRequestSchema,
  normalizeBookingFormData,
} from "./booking-validation";

const validRequest = {
  pickupDate: "2026-06-01",
  pickupTime: "10:00",
  returnDate: "2026-06-04",
  returnTime: "10:00",
  pickupLocationType: "hotel",
  pickupLocationText: "Hotel in Batumi",
  dropoffLocationType: "batumi_airport",
  dropoffLocationText: "Batumi Airport",
  customerName: "Alex Visitor",
  customerPhone: "+995555111222",
  preferredMessenger: "whatsapp",
  customerEmail: "alex@example.com",
  driverAge: 30,
  drivingExperienceYears: 8,
  licenceCountry: "Germany",
  plannedRoute: "Batumi, Gonio, Botanical Garden",
  wantsCrossBorder: false,
  acceptsTerms: true,
};

describe("booking request validation", () => {
  it("accepts a valid request without document uploads", () => {
    expect(bookingRequestSchema.safeParse(validRequest).success).toBe(true);
  });

  it("requires return date and time to be after pickup date and time", () => {
    const result = bookingRequestSchema.safeParse({
      ...validRequest,
      returnDate: "2026-06-01",
      returnTime: "09:00",
    });

    expect(result.success).toBe(false);
  });

  it("enforces configured age, driving experience, and accepted terms", () => {
    const result = bookingRequestSchema.safeParse({
      ...validRequest,
      driverAge: 20,
      drivingExperienceYears: 1,
      acceptsTerms: false,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join("."));
      expect(paths).toContain("driverAge");
      expect(paths).toContain("drivingExperienceYears");
      expect(paths).toContain("acceptsTerms");
    }
  });

  it("normalizes browser form entries before validation", () => {
    const normalized = normalizeBookingFormData({
      ...validRequest,
      driverAge: "30",
      drivingExperienceYears: "8",
      passengersCount: "4",
      luggageCount: "3",
      childSeatNeeded: "on",
      wantsCrossBorder: "no",
      acceptsTerms: "on",
    });

    expect(normalized).toMatchObject({
      driverAge: 30,
      drivingExperienceYears: 8,
      passengersCount: 4,
      luggageCount: 3,
      childSeatNeeded: true,
      wantsCrossBorder: false,
      acceptsTerms: true,
    });
  });
});

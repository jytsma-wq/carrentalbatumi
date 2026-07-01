import { describe, expect, it } from "vitest";

import { hasAvailabilityConflict, rangesOverlap } from "./availability";

describe("availability overlap detection", () => {
  it("detects date-range overlap with exclusive end boundaries", () => {
    expect(
      rangesOverlap(
        { start: "2026-07-10T10:00:00.000Z", end: "2026-07-12T10:00:00.000Z" },
        { start: "2026-07-12T10:00:00.000Z", end: "2026-07-14T10:00:00.000Z" },
      ),
    ).toBe(false);

    expect(
      rangesOverlap(
        { start: "2026-07-10T10:00:00.000Z", end: "2026-07-12T10:00:00.000Z" },
        { start: "2026-07-11T10:00:00.000Z", end: "2026-07-13T10:00:00.000Z" },
      ),
    ).toBe(true);
  });

  it("blocks confirmed bookings and blocked dates, but not pending requests by default", () => {
    const conflict = hasAvailabilityConflict({
      requestedRange: {
        start: "2026-08-01T10:00:00.000Z",
        end: "2026-08-05T10:00:00.000Z",
      },
      bookings: [
        {
          start: "2026-08-02T10:00:00.000Z",
          end: "2026-08-04T10:00:00.000Z",
          status: "pending",
        },
      ],
      blockedDates: [],
    });

    expect(conflict.hasConflict).toBe(false);

    const confirmedConflict = hasAvailabilityConflict({
      requestedRange: {
        start: "2026-08-01T10:00:00.000Z",
        end: "2026-08-05T10:00:00.000Z",
      },
      bookings: [
        {
          start: "2026-08-02T10:00:00.000Z",
          end: "2026-08-04T10:00:00.000Z",
          status: "confirmed",
        },
      ],
      blockedDates: [],
    });

    expect(confirmedConflict).toMatchObject({
      hasConflict: true,
      reason: "booking",
    });

    const blockedConflict = hasAvailabilityConflict({
      requestedRange: {
        start: "2026-08-01T10:00:00.000Z",
        end: "2026-08-05T10:00:00.000Z",
      },
      bookings: [],
      blockedDates: [
        {
          start: "2026-08-03T00:00:00.000Z",
          end: "2026-08-04T23:59:59.000Z",
        },
      ],
    });

    expect(blockedConflict).toMatchObject({
      hasConflict: true,
      reason: "blocked-date",
    });
  });
});

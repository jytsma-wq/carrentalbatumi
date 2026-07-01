import { blockingBookingStatuses, type BookingStatus } from "./defaults";

type Range = {
  start: string;
  end: string;
};

type BookingRange = Range & {
  status: BookingStatus;
};

type ConflictInput = {
  requestedRange: Range;
  bookings: BookingRange[];
  blockedDates: Range[];
  pendingBlocksAvailability?: boolean;
};

type AvailabilityConflict =
  | {
      hasConflict: false;
      reason: null;
    }
  | {
      hasConflict: true;
      reason: "booking" | "blocked-date";
    };

export function rangesOverlap(first: Range, second: Range) {
  return (
    new Date(first.start).getTime() < new Date(second.end).getTime() &&
    new Date(second.start).getTime() < new Date(first.end).getTime()
  );
}

export function hasAvailabilityConflict({
  requestedRange,
  bookings,
  blockedDates,
  pendingBlocksAvailability = false,
}: ConflictInput): AvailabilityConflict {
  const bookingConflict = bookings.some((booking) => {
    const blocksAvailability =
      (blockingBookingStatuses as readonly BookingStatus[]).includes(
        booking.status,
      ) ||
      (pendingBlocksAvailability && booking.status === "pending");

    return blocksAvailability && rangesOverlap(requestedRange, booking);
  });

  if (bookingConflict) {
    return {
      hasConflict: true,
      reason: "booking",
    };
  }

  const blockedDateConflict = blockedDates.some((blockedDate) =>
    rangesOverlap(requestedRange, blockedDate),
  );

  if (blockedDateConflict) {
    return {
      hasConflict: true,
      reason: "blocked-date",
    };
  }

  return {
    hasConflict: false,
    reason: null,
  };
}

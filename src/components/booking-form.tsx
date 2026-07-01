"use client";

import { useActionState } from "react";

import { submitBookingRequest } from "@/app/actions/booking";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type BookingFormProps = {
  labels: Dictionary["bookingForm"];
  locale: Locale;
};

const locationOptions = [
  "batumi_airport",
  "hotel",
  "apartment",
  "city_address",
  "other",
] as const;

const messengerOptions = ["whatsapp", "telegram", "phone", "email"] as const;

function Field({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#101820]">
      <span className="leading-5">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "min-h-12 rounded-xl border border-[#c8d5d1] bg-white px-3 text-sm font-medium text-[#101820] outline-none transition placeholder:text-[#8a969b] focus:border-[#0f5f71] focus:ring-4 focus:ring-[#0f5f71]/10";

const fieldsetClass =
  "motion-fade-up grid gap-5 border-t border-[#d9e2df] pt-7";

export function BookingForm({ labels, locale }: BookingFormProps) {
  const [state, action, isPending] = useActionState(submitBookingRequest, {
    status: "idle",
    errorCode: "",
  });

  return (
    <section className="border-y border-[#d9e2df] bg-[#f7faf8]">
      <div className="mx-auto max-w-[1040px] px-5 py-14 lg:px-8">
        <div className="border border-[#d9e2df] bg-white shadow-sm">
          <div className="border-b border-[#d9e2df] p-5 sm:p-8">
            <h2 className="motion-fade-up text-3xl font-semibold tracking-normal text-[#101820] sm:text-4xl">
              {labels.title}
            </h2>
            <p className="motion-fade-up mt-3 max-w-2xl text-base leading-7 text-[#42515a] [--delay:80ms]">
              {labels.intro}
            </p>
          </div>

          {state.status === "error" ? (
            <p className="mx-5 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800 sm:mx-8">
              {labels.validationError}
            </p>
          ) : null}

          <form action={action} className="grid gap-8 p-5 sm:p-8">
            <input name="locale" type="hidden" value={locale} />

            <fieldset className={fieldsetClass}>
              <legend className="text-lg font-semibold text-[#101820]">
                {labels.sections.dates}
              </legend>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Field label={labels.labels.pickupDate}>
                  <input
                    className={inputClass}
                    name="pickupDate"
                    required
                    type="date"
                  />
                </Field>
                <Field label={labels.labels.pickupTime}>
                  <input
                    className={inputClass}
                    name="pickupTime"
                    required
                    type="time"
                  />
                </Field>
                <Field label={labels.labels.returnDate}>
                  <input
                    className={inputClass}
                    name="returnDate"
                    required
                    type="date"
                  />
                </Field>
                <Field label={labels.labels.returnTime}>
                  <input
                    className={inputClass}
                    name="returnTime"
                    required
                    type="time"
                  />
                </Field>
                <Field label={labels.labels.pickupLocationType}>
                  <select
                    className={inputClass}
                    name="pickupLocationType"
                    required
                  >
                    {locationOptions.map((option) => (
                      <option key={option} value={option}>
                        {labels.locationOptions[option]}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={labels.labels.dropoffLocationType}>
                  <select
                    className={inputClass}
                    name="dropoffLocationType"
                    required
                  >
                    {locationOptions.map((option) => (
                      <option key={option} value={option}>
                        {labels.locationOptions[option]}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={labels.labels.pickupLocationText}>
                  <input
                    className={inputClass}
                    maxLength={200}
                    name="pickupLocationText"
                    required
                  />
                </Field>
                <Field label={labels.labels.dropoffLocationText}>
                  <input
                    className={inputClass}
                    maxLength={200}
                    name="dropoffLocationText"
                    required
                  />
                </Field>
                <Field label={labels.labels.flightNumber}>
                  <input
                    className={inputClass}
                    maxLength={40}
                    name="flightNumber"
                  />
                </Field>
                <Field label={labels.labels.hotelOrApartmentName}>
                  <input
                    className={inputClass}
                    maxLength={120}
                    name="hotelOrApartmentName"
                  />
                </Field>
              </div>
            </fieldset>

            <fieldset className={`${fieldsetClass} [--delay:80ms]`}>
              <legend className="text-lg font-semibold text-[#101820]">
                {labels.sections.driver}
              </legend>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Field label={labels.labels.customerName}>
                  <input
                    className={inputClass}
                    maxLength={120}
                    name="customerName"
                    required
                  />
                </Field>
                <Field label={labels.labels.customerPhone}>
                  <input
                    className={inputClass}
                    maxLength={40}
                    name="customerPhone"
                    required
                  />
                </Field>
                <Field label={labels.labels.customerEmail}>
                  <input
                    className={inputClass}
                    maxLength={160}
                    name="customerEmail"
                    required
                    type="email"
                  />
                </Field>
                <Field label={labels.labels.preferredMessenger}>
                  <select
                    className={inputClass}
                    name="preferredMessenger"
                    required
                  >
                    {messengerOptions.map((option) => (
                      <option key={option} value={option}>
                        {labels.messengerOptions[option]}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={labels.labels.driverAge}>
                  <input
                    className={inputClass}
                    min={18}
                    name="driverAge"
                    required
                    type="number"
                  />
                </Field>
                <Field label={labels.labels.drivingExperienceYears}>
                  <input
                    className={inputClass}
                    min={0}
                    name="drivingExperienceYears"
                    required
                    type="number"
                  />
                </Field>
                <Field label={labels.labels.licenceCountry}>
                  <input
                    className={inputClass}
                    maxLength={80}
                    name="licenceCountry"
                    required
                  />
                </Field>
              </div>
            </fieldset>

            <fieldset className={`${fieldsetClass} [--delay:160ms]`}>
              <legend className="text-lg font-semibold text-[#101820]">
                {labels.sections.trip}
              </legend>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label={labels.labels.plannedRoute}>
                  <textarea
                    className={`${inputClass} min-h-28 py-3`}
                    maxLength={500}
                    name="plannedRoute"
                    required
                  />
                </Field>
                <Field label={labels.labels.message}>
                  <textarea
                    className={`${inputClass} min-h-28 py-3`}
                    maxLength={1000}
                    name="message"
                  />
                </Field>
                <Field label={labels.labels.wantsCrossBorder}>
                  <select
                    className={inputClass}
                    name="wantsCrossBorder"
                    required
                  >
                    <option value="no">{labels.yesNo.no}</option>
                    <option value="yes">{labels.yesNo.yes}</option>
                  </select>
                </Field>
                <Field label={labels.labels.passengersCount}>
                  <input
                    className={inputClass}
                    max={5}
                    min={1}
                    name="passengersCount"
                    type="number"
                  />
                </Field>
                <Field label={labels.labels.luggageCount}>
                  <input
                    className={inputClass}
                    max={6}
                    min={0}
                    name="luggageCount"
                    type="number"
                  />
                </Field>
                <label className="flex min-h-12 items-center gap-3 rounded-xl border border-[#d9e2df] bg-white px-4 py-3 text-sm font-semibold text-[#101820] transition hover:border-[#0f5f71]/35">
                  <input
                    className="size-4 accent-[#0f5f71]"
                    name="childSeatNeeded"
                    type="checkbox"
                  />
                  {labels.labels.childSeatNeeded}
                </label>
              </div>
            </fieldset>

            <label className="motion-fade-up flex items-start gap-3 rounded-xl border border-[#d9e2df] bg-[#f7faf8] px-4 py-3 text-sm font-semibold text-[#101820] [--delay:220ms]">
              <input
                className="mt-1 size-4 accent-[#0f5f71]"
                name="acceptsTerms"
                required
                type="checkbox"
              />
              {labels.labels.acceptsTerms}
            </label>

            <button
              className="motion-shine inline-flex min-h-12 items-center justify-center rounded-full bg-[#101820] px-7 text-sm font-semibold text-white shadow-lg shadow-slate-300/60 transition hover:bg-[#183f36] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
              disabled={isPending}
              type="submit"
            >
              <span className="relative z-10">{labels.submit}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

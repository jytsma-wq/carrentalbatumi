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
    <label className="grid gap-2 text-sm font-semibold text-slate-900">
      <span>{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "min-h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium text-slate-950 outline-none transition focus:border-sky-600 focus:ring-4 focus:ring-sky-100";

export function BookingForm({ labels, locale }: BookingFormProps) {
  const [state, action, isPending] = useActionState(submitBookingRequest, {
    status: "idle",
    errorCode: "",
  });

  return (
    <section className="border-y border-slate-200 bg-sky-50/50">
      <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-normal text-slate-950">
              {labels.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              {labels.intro}
            </p>
          </div>

          {state.status === "error" ? (
            <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
              {labels.validationError}
            </p>
          ) : null}

          <form action={action} className="mt-8 grid gap-8">
            <input name="locale" type="hidden" value={locale} />

            <fieldset className="grid gap-4">
              <legend className="text-lg font-bold text-slate-950">
                {labels.sections.dates}
              </legend>
              <div className="grid gap-4 md:grid-cols-2">
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

            <fieldset className="grid gap-4">
              <legend className="text-lg font-bold text-slate-950">
                {labels.sections.driver}
              </legend>
              <div className="grid gap-4 md:grid-cols-2">
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

            <fieldset className="grid gap-4">
              <legend className="text-lg font-bold text-slate-950">
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
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
                  <input name="childSeatNeeded" type="checkbox" />
                  {labels.labels.childSeatNeeded}
                </label>
              </div>
            </fieldset>

            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
              <input
                className="mt-1"
                name="acceptsTerms"
                required
                type="checkbox"
              />
              {labels.labels.acceptsTerms}
            </label>

            <button
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-red-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
              disabled={isPending}
              type="submit"
            >
              {labels.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

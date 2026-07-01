const adminSections = [
  "/admin/bookings",
  "/admin/calendar",
  "/admin/pricing",
  "/admin/car",
  "/admin/photos",
  "/admin/settings",
] as const;

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold tracking-normal">Admin foundation</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          These routes are protected by Basic authentication and reserved for
          owner workflows. The next implementation step is replacing this
          placeholder with database-backed booking, calendar, pricing, car,
          photo, and settings screens.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {adminSections.map((section) => (
            <div
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900"
              key={section}
            >
              {section}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

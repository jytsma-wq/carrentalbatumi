import { defaultPricingRules } from "@/domain/defaults";
import type { Dictionary } from "@/i18n/dictionaries";

type PricingTableProps = {
  labels: Dictionary["pricingTable"];
};

function interpolate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, String(value)),
    template,
  );
}

export function PricingTable({ labels }: PricingTableProps) {
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-normal text-slate-950">
          {labels.title}
        </h2>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead className="bg-sky-900 text-white">
              <tr>
                <th className="px-4 py-3">{labels.season}</th>
                <th className="px-4 py-3">{labels.days}</th>
                <th className="px-4 py-3">{labels.price}</th>
              </tr>
            </thead>
            <tbody>
              {defaultPricingRules.map((rule) => (
                <tr
                  className="border-t border-slate-200"
                  key={`${rule.seasonName}-${rule.startMonth}-${rule.minDays}-${rule.maxDays}`}
                >
                  <td className="px-4 py-3 font-semibold text-slate-950">
                    {labels[rule.seasonName]}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {rule.minDays === 1 && rule.maxDays === 1
                      ? labels.oneDay
                      : interpolate(labels.dayRange, {
                          min: rule.minDays,
                          max: rule.maxDays,
                        })}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-950">
                    {interpolate(labels.gelPerDay, {
                      price: rule.dailyPriceGel,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
              {labels.depositTitle}
            </p>
            <p className="mt-2 text-lg font-bold text-slate-950">
              {labels.depositValue}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
              {labels.mileageTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {labels.mileageValue}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
              {labels.deliveryTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {labels.deliveryValue}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { defaultPricingRules } from "@/domain/defaults";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CSSProperties } from "react";

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
    <section className="border-y border-[#d9e2df] bg-[#f7faf8]">
      <div className="mx-auto max-w-[980px] px-5 py-14 lg:px-8">
        <h2 className="motion-fade-up text-3xl font-semibold tracking-normal text-[#101820] sm:text-4xl">
          {labels.title}
        </h2>

        <div className="motion-fade-up mt-7 overflow-x-auto border border-[#d9e2df] bg-white shadow-sm [--delay:90ms]">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead className="border-b border-[#d9e2df] bg-[#071114] text-white">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase">
                  {labels.season}
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase">
                  {labels.days}
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase">
                  {labels.price}
                </th>
              </tr>
            </thead>
            <tbody>
              {defaultPricingRules.map((rule, index) => (
                <tr
                  className="motion-fade-up border-t border-[#d9e2df] transition hover:bg-[#f7faf8]"
                  key={`${rule.seasonName}-${rule.startMonth}-${rule.minDays}-${rule.maxDays}`}
                  style={
                    { "--delay": `${140 + index * 45}ms` } as CSSProperties
                  }
                >
                  <td className="px-5 py-4 font-semibold text-[#101820]">
                    {labels[rule.seasonName]}
                  </td>
                  <td className="px-5 py-4 text-[#42515a]">
                    {rule.minDays === 1 && rule.maxDays === 1
                      ? labels.oneDay
                      : interpolate(labels.dayRange, {
                          min: rule.minDays,
                          max: rule.maxDays,
                        })}
                  </td>
                  <td className="px-5 py-4 font-semibold text-[#101820]">
                    {interpolate(labels.gelPerDay, {
                      price: rule.dailyPriceGel,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-0 overflow-hidden border border-[#d9e2df] bg-white md:grid-cols-3">
          <div className="lift-hover border-b border-[#d9e2df] p-5 md:border-b-0 md:border-r">
            <p className="text-[11px] font-bold uppercase leading-5 text-[#0f5f71]">
              {labels.depositTitle}
            </p>
            <p className="mt-2 text-lg font-semibold text-[#101820]">
              {labels.depositValue}
            </p>
          </div>
          <div className="lift-hover border-b border-[#d9e2df] p-5 md:border-b-0 md:border-r">
            <p className="text-[11px] font-bold uppercase leading-5 text-[#0f5f71]">
              {labels.mileageTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#42515a]">
              {labels.mileageValue}
            </p>
          </div>
          <div className="lift-hover p-5">
            <p className="text-[11px] font-bold uppercase leading-5 text-[#0f5f71]">
              {labels.deliveryTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#42515a]">
              {labels.deliveryValue}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

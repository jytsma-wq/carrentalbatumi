import Link from "next/link";

import { homePath, pagePath, pageRegistry } from "@/content/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

import { LanguageSwitcher } from "./language-switcher";

type SiteHeaderProps = {
  dict: Dictionary;
  locale: Locale;
};

const primaryNavSlugs = [
  "car",
  "pricing",
  "availability",
  "batumi-airport-car-rental",
  "hotel-delivery-batumi",
  "long-term-car-rental-batumi",
  "faq",
] as const;

export function SiteHeader({ dict, locale }: SiteHeaderProps) {
  const navItems = pageRegistry.filter((page) =>
    primaryNavSlugs.includes(page.slug as (typeof primaryNavSlugs)[number]),
  );

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-1">
          <Link
            className="text-base font-bold tracking-normal text-slate-950"
            href={homePath(locale)}
          >
            {dict.meta.siteName}
          </Link>

          <nav
            aria-label={dict.meta.siteName}
            className="hidden flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-700 md:flex"
          >
            <Link className="hover:text-sky-800" href={homePath(locale)}>
              {dict.nav.home}
            </Link>
            {navItems.map((page) => (
              <Link
                className="hover:text-sky-800"
                href={pagePath(locale, page.slug)}
                key={page.slug}
              >
                {dict.nav[page.navKey]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <LanguageSwitcher
            currentLocale={locale}
            labels={dict.languageSwitcher}
          />
          <Link
            className="inline-flex min-h-11 items-center justify-center self-start rounded-full bg-red-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800 sm:self-auto"
            href={pagePath(locale, "book")}
          >
            {dict.nav.primaryAction}
          </Link>
        </div>
      </div>
    </header>
  );
}

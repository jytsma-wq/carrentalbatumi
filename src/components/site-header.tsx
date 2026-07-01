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
    <header className="sticky top-0 z-20 border-b border-[#d9e2df]/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-1">
          <Link
            className="group inline-flex items-center gap-3 text-sm font-semibold tracking-normal text-[#101820]"
            href={homePath(locale)}
          >
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-xl border border-[#d9e2df] bg-[#f7faf8] text-[#0f5f71] transition group-hover:border-[#0f5f71]/40"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 14.25h1.42l1.78-3.2A3 3 0 0 1 9.82 9.5h4.36a3 3 0 0 1 2.62 1.55l1.78 3.2H20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
                <path
                  d="M5.75 14.25h12.5A1.75 1.75 0 0 1 20 16v2H4v-2a1.75 1.75 0 0 1 1.75-1.75Z"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
                <path
                  d="M7 18.5h.01M17 18.5h.01"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2.8"
                />
              </svg>
            </span>
            <span className="max-w-40 leading-tight">{dict.meta.siteName}</span>
          </Link>

          <nav
            aria-label={dict.meta.siteName}
            className="hidden flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-semibold text-[#42515a] md:flex xl:gap-x-4"
          >
            <Link
              className="transition hover:text-[#0f5f71]"
              href={homePath(locale)}
            >
              {dict.nav.home}
            </Link>
            {navItems.map((page) => (
              <Link
                className="transition hover:text-[#0f5f71]"
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
            className="inline-flex min-h-11 items-center justify-center self-start rounded-full bg-[#101820] px-5 text-sm font-semibold text-white shadow-sm shadow-slate-200 transition hover:bg-[#183f36] sm:self-auto"
            href={pagePath(locale, "book")}
          >
            {dict.nav.primaryAction}
          </Link>
        </div>
      </div>
    </header>
  );
}

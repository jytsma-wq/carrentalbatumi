"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  labels: Dictionary["languageSwitcher"];
};

function localeHref(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  segments[1] = locale;

  return segments.join("/") || `/${locale}`;
}

export function LanguageSwitcher({
  currentLocale,
  labels,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={labels.label} className="flex flex-wrap gap-1">
      {locales.map((locale) => {
        const isActive = locale === currentLocale;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={[
              "rounded-full border px-3 py-1 text-xs font-semibold transition",
              isActive
                ? "border-sky-700 bg-sky-700 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-800",
            ].join(" ")}
            href={localeHref(pathname, locale)}
            key={locale}
          >
            {labels.options[locale]}
          </Link>
        );
      })}
    </nav>
  );
}

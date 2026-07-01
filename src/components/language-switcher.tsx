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
    <nav
      aria-label={labels.label}
      className="flex w-fit flex-wrap gap-1 rounded-full border border-[#d9e2df] bg-[#f7faf8] p-1"
    >
      {locales.map((locale) => {
        const isActive = locale === currentLocale;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={[
              "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase leading-5 transition xl:px-3 xl:text-[11px]",
              isActive
                ? "bg-white text-[#101820] shadow-sm"
                : "text-[#65747c] hover:text-[#0f5f71]",
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

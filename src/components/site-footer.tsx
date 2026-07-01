import Link from "next/link";

import { pagePath } from "@/content/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { telegramHref, whatsappHref } from "@/lib/env";

type SiteFooterProps = {
  dict: Dictionary;
  locale: Locale;
};

export function SiteFooter({ dict, locale }: SiteFooterProps) {
  return (
    <footer className="border-t border-[#203733] bg-[#071114] text-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold">{dict.meta.siteName}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/62">
            {dict.footer.tagline}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            {dict.footer.contactHeading}
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/62">
            <a className="transition hover:text-white" href={whatsappHref()}>
              {dict.contactLinks.whatsapp}
            </a>
            <a className="transition hover:text-white" href={telegramHref()}>
              {dict.contactLinks.telegram}
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            {dict.footer.legalHeading}
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/62">
            <Link
              className="transition hover:text-white"
              href={pagePath(locale, "terms")}
            >
              {dict.nav.terms}
            </Link>
            <Link
              className="transition hover:text-white"
              href={pagePath(locale, "privacy")}
            >
              {dict.nav.privacy}
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/45">
        {dict.footer.copyright}
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { homePath, pagePath } from "@/content/routes";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { whatsappHref } from "@/lib/env";

type ThankYouRouteProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: ThankYouRouteProps): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const dict = await getDictionary(localeParam);

  return {
    title: dict.thankYou.meta.title,
    description: dict.thankYou.meta.description,
  };
}

export default async function ThankYouPage({ params }: ThankYouRouteProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dict = await getDictionary(locale);

  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-bold tracking-normal text-slate-950">
            {dict.thankYou.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-700">
            {dict.thankYou.body}
          </p>
          <p className="mt-4 rounded-2xl bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-900">
            {dict.thankYou.responseTime}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-red-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800"
              href={whatsappHref()}
            >
              {dict.thankYou.primaryAction}
            </a>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-6 text-sm font-semibold text-slate-950 transition hover:border-sky-400 hover:text-sky-800"
              href={homePath(locale)}
            >
              {dict.thankYou.secondaryAction}
            </Link>
          </div>
          <Link
            className="mt-6 inline-flex text-sm font-semibold text-sky-800 hover:text-sky-950"
            href={pagePath(locale, "contact")}
          >
            {dict.nav.contact}
          </Link>
        </div>
      </section>
    </main>
  );
}

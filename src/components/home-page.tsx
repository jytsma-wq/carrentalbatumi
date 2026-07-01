import Image from "next/image";
import Link from "next/link";

import { pagePath } from "@/content/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type HomePageProps = {
  dict: Dictionary;
  locale: Locale;
};

export function HomePage({ dict, locale }: HomePageProps) {
  const { home } = dict;

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              {home.hero.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              {home.hero.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-red-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800"
                href={pagePath(locale, "availability")}
              >
                {home.hero.primaryAction}
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-6 text-sm font-semibold text-slate-950 transition hover:border-sky-400 hover:text-sky-800"
                href={pagePath(locale, "contact")}
              >
                {home.hero.secondaryAction}
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-200">
            <Image
              alt={home.hero.imageAlt}
              className="aspect-[4/3] h-full w-full object-cover lg:aspect-[5/4]"
              height={1200}
              priority
              src="/batumi-private-car-hero.png"
              width={1600}
            />
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {home.highlights.map((highlight) => (
            <div
              className="rounded-2xl border border-slate-200 bg-white p-5"
              key={highlight.label}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
                {highlight.label}
              </p>
              <p className="mt-3 text-lg font-bold leading-7 text-slate-950">
                {highlight.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-3 lg:px-8">
          {home.sections.map((section) => (
            <article
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              key={section.title}
            >
              <h2 className="text-2xl font-bold tracking-normal text-slate-950">
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {section.body}
              </p>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sky-900 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-normal">
              {home.finalCta.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-sky-100">
              {home.finalCta.body}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-sky-950 transition hover:bg-sky-50"
              href={pagePath(locale, "contact")}
            >
              {home.finalCta.primaryAction}
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              href={pagePath(locale, "faq")}
            >
              {home.finalCta.secondaryAction}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

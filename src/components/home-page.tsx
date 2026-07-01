import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

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
      <section className="relative isolate overflow-hidden bg-[#f7faf8]">
        <Image
          alt={home.hero.imageAlt}
          className="motion-drift absolute inset-0 -z-20 h-full w-full object-cover object-[58%_50%]"
          fill
          priority
          sizes="100vw"
          src="/batumi-private-car-hero.png"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.9)_32%,rgba(255,255,255,0.42)_56%,rgba(255,255,255,0.08)_100%)]" />
        <svg
          aria-hidden="true"
          className="absolute bottom-24 left-0 right-0 z-0 hidden h-52 w-full text-[#0f5f71]/30 lg:block"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1440 220"
        >
          <path
            className="motion-line"
            d="M-40 176C126 102 255 90 397 138C545 188 656 193 796 118C913 55 1013 34 1141 72C1267 109 1358 94 1488 28"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle
            className="motion-pulse"
            cx="1141"
            cy="72"
            fill="currentColor"
            r="5"
          />
        </svg>

        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-[1440px] flex-col justify-end px-5 pb-8 pt-16 sm:min-h-[820px] lg:px-8">
          <div className="motion-fade-up max-w-2xl pb-12">
            <h1 className="text-balance text-5xl font-semibold leading-[0.96] tracking-normal text-[#101820] sm:text-7xl lg:text-[5.7rem]">
              {home.hero.title}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#42515a] sm:text-lg">
              {home.hero.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="motion-shine inline-flex min-h-12 items-center justify-center rounded-full bg-[#101820] px-6 text-sm font-semibold text-white shadow-lg shadow-slate-300/60 transition hover:bg-[#183f36] active:scale-[0.98]"
                href={pagePath(locale, "availability")}
              >
                <span className="relative z-10">{home.hero.primaryAction}</span>
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#b8c8c3] bg-white/55 px-6 text-sm font-semibold text-[#101820] backdrop-blur transition hover:border-[#0f5f71]/45 hover:bg-white active:scale-[0.98]"
                href={pagePath(locale, "contact")}
              >
                {home.hero.secondaryAction}
              </Link>
            </div>
          </div>

          <div className="motion-fade-up grid overflow-hidden border-y border-[#d9e2df] bg-white/78 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 [--delay:160ms]">
            {home.highlights.map((highlight, index) => (
              <div
                className="border-b border-[#d9e2df] p-5 last:border-b-0 sm:[&:nth-child(2n)]:border-l lg:border-b-0 lg:border-l lg:first:border-l-0 sm:[&:nth-child(3)]:border-b-0 sm:[&:nth-child(4)]:border-b-0"
                key={highlight.label}
                style={{ "--delay": `${220 + index * 90}ms` } as CSSProperties}
              >
                <p className="text-[11px] font-bold uppercase leading-5 text-[#0f5f71]">
                  {highlight.label}
                </p>
                <p className="mt-3 text-lg font-semibold leading-7 text-[#101820]">
                  {highlight.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8">
          <div className="border-y border-[#d9e2df]">
            {home.sections.map((section, index) => (
              <article
                className="motion-fade-up grid gap-6 border-b border-[#d9e2df] py-9 last:border-b-0 md:grid-cols-[0.42fr_0.58fr]"
                key={section.title}
                style={{ "--delay": `${index * 100}ms` } as CSSProperties}
              >
                <h2 className="text-2xl font-semibold tracking-normal text-[#101820] sm:text-3xl">
                  {section.title}
                </h2>
                <div>
                  <p className="text-base leading-8 text-[#42515a]">
                    {section.body}
                  </p>
                  <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#23343b]">
                    {section.items.map((item) => (
                      <li className="flex gap-3" key={item}>
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-6 shrink-0 rounded-full bg-[#0f5f71]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#071114] text-white">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_30%,rgba(15,95,113,0.38),transparent_42%)]" />
        <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-5 py-16 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="motion-fade-up max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl">
              {home.finalCta.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/68">
              {home.finalCta.body}
            </p>
          </div>
          <div className="motion-fade-up flex flex-col gap-3 sm:flex-row [--delay:140ms]">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#101820] transition hover:bg-[#eef6f3] active:scale-[0.98]"
              href={pagePath(locale, "contact")}
            >
              {home.finalCta.primaryAction}
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-[0.98]"
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

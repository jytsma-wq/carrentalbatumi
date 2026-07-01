import Link from "next/link";
import type { CSSProperties } from "react";

import type { Dictionary } from "@/i18n/dictionaries";

type ContentPageCopy = Dictionary["pages"][keyof Dictionary["pages"]];

type CtaLink = {
  external?: boolean;
  href: string;
};

type ContentPageProps = {
  children?: React.ReactNode;
  copy: ContentPageCopy;
  links: {
    primary: CtaLink;
    secondary: CtaLink;
  };
};

function CtaAnchor({
  children,
  className,
  link,
}: {
  children: React.ReactNode;
  className: string;
  link: CtaLink;
}) {
  if (link.external) {
    return (
      <a
        className={className}
        href={link.href}
        rel="noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={link.href}>
      {children}
    </Link>
  );
}

export function ContentPage({ children, copy, links }: ContentPageProps) {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#d9e2df] bg-[#f7faf8]">
        <div
          aria-hidden="true"
          className="absolute -right-24 top-10 h-72 w-72 rounded-full border border-[#0f5f71]/15"
        />
        <svg
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-28 w-full text-[#0f5f71]/20"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            className="motion-line"
            d="M-20 86C168 16 298 84 454 58C629 29 712 12 878 54C1036 94 1124 54 1220 20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
        <div className="relative mx-auto max-w-[1180px] px-5 py-[4.5rem] lg:px-8 lg:py-[5.5rem]">
          <h1 className="motion-fade-up max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-normal text-[#101820] sm:text-6xl">
            {copy.hero.title}
          </h1>
          <p className="motion-fade-up mt-6 max-w-3xl text-base leading-8 text-[#42515a] [--delay:110ms] sm:text-lg">
            {copy.hero.intro}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[980px] px-5 py-14 lg:px-8">
          <div className="border-y border-[#d9e2df]">
            {copy.sections.map((section, index) => (
              <article
                className="motion-fade-up grid gap-5 border-b border-[#d9e2df] py-8 last:border-b-0 md:grid-cols-[0.38fr_0.62fr]"
                key={section.title}
                style={{ "--delay": `${index * 90}ms` } as CSSProperties}
              >
                <h2 className="text-2xl font-semibold tracking-normal text-[#101820]">
                  {section.title}
                </h2>
                <div>
                  <p className="text-base leading-8 text-[#42515a]">
                    {section.body}
                  </p>
                  <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#23343b]">
                    {section.items.map((item) => (
                      <li className="flex gap-3" key={item}>
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-5 shrink-0 rounded-full bg-[#0f5f71]"
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

      {children}

      <section className="bg-[#f7faf8]">
        <div className="mx-auto max-w-[980px] px-5 py-12 lg:px-8">
          <div className="relative overflow-hidden border border-[#203733] bg-[#071114] p-7 text-white shadow-2xl shadow-slate-200/80 sm:p-9">
            <div className="absolute inset-y-0 right-0 w-2/5 bg-[radial-gradient(circle_at_70%_30%,rgba(15,95,113,0.42),transparent_48%)]" />
            <h2 className="motion-fade-up relative text-3xl font-semibold tracking-normal">
              {copy.cta.title}
            </h2>
            <p className="motion-fade-up relative mt-3 max-w-2xl text-base leading-7 text-white/68 [--delay:80ms]">
              {copy.cta.body}
            </p>
            <div className="motion-fade-up relative mt-7 flex flex-col gap-3 sm:flex-row [--delay:140ms]">
              <CtaAnchor
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#101820] transition hover:bg-[#eef6f3] active:scale-[0.98]"
                link={links.primary}
              >
                {copy.cta.primaryAction}
              </CtaAnchor>
              <CtaAnchor
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-[0.98]"
                link={links.secondary}
              >
                {copy.cta.secondaryAction}
              </CtaAnchor>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

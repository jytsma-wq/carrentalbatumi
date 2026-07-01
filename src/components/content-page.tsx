import Link from "next/link";

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
      <section className="border-b border-slate-200 bg-gradient-to-br from-white via-sky-50 to-white">
        <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">
            {copy.hero.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {copy.hero.intro}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-6 px-5 py-12 lg:px-8">
          {copy.sections.map((section) => (
            <article
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              key={section.title}
            >
              <h2 className="text-2xl font-bold tracking-normal text-slate-950">
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
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

      {children}

      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
          <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl shadow-slate-200 sm:p-9">
            <h2 className="text-3xl font-bold tracking-normal">
              {copy.cta.title}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              {copy.cta.body}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CtaAnchor
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-sky-50"
                link={links.primary}
              >
                {copy.cta.primaryAction}
              </CtaAnchor>
              <CtaAnchor
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
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

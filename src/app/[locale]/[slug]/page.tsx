import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BookingForm } from "@/components/booking-form";
import { ContentPage } from "@/components/content-page";
import { PricingTable } from "@/components/pricing-table";
import { getPageBySlug, pagePath, pageRegistry } from "@/content/routes";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { telegramHref, whatsappHref } from "@/lib/env";

type ContentRouteProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    pageRegistry.map((page) => ({ locale, slug: page.slug })),
  );
}

function assertRoute(locale: string, slug: string) {
  const page = getPageBySlug(slug);

  if (!isLocale(locale) || !page) {
    notFound();
  }

  return { locale, page };
}

function ctaLinks(pageKey: string, locale: Locale) {
  switch (pageKey) {
    case "pricing":
      return {
        primary: { href: pagePath(locale, "contact") },
        secondary: { href: pagePath(locale, "availability") },
      };
    case "availability":
      return {
        primary: { href: pagePath(locale, "book") },
        secondary: { href: pagePath(locale, "contact") },
      };
    case "booking":
      return {
        primary: { href: pagePath(locale, "contact") },
        secondary: { href: pagePath(locale, "terms") },
      };
    case "airport":
      return {
        primary: { href: pagePath(locale, "book") },
        secondary: { href: pagePath(locale, "pricing") },
      };
    case "hotel":
      return {
        primary: { href: pagePath(locale, "contact") },
        secondary: { href: pagePath(locale, "availability") },
      };
    case "longTerm":
      return {
        primary: { href: pagePath(locale, "book") },
        secondary: { href: pagePath(locale, "pricing") },
      };
    case "faq":
      return {
        primary: { href: pagePath(locale, "contact") },
        secondary: { href: pagePath(locale, "terms") },
      };
    case "terms":
      return {
        primary: { href: pagePath(locale, "contact") },
        secondary: { href: pagePath(locale, "privacy") },
      };
    case "privacy":
      return {
        primary: { href: pagePath(locale, "contact") },
        secondary: { href: pagePath(locale, "terms") },
      };
    case "contact":
      return {
        primary: { external: true, href: whatsappHref() },
        secondary: { external: true, href: telegramHref() },
      };
    default:
      return {
        primary: { href: pagePath(locale, "book") },
        secondary: { href: pagePath(locale, "pricing") },
      };
  }
}

export async function generateMetadata({
  params,
}: ContentRouteProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const { locale, page } = assertRoute(localeParam, slug);
  const dict = await getDictionary(locale);
  const copy = dict.pages[page.key];

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: pagePath(locale, page.slug),
      languages: Object.fromEntries(
        locales.map((supportedLocale) => [
          supportedLocale,
          pagePath(supportedLocale, page.slug),
        ]),
      ),
    },
  };
}

export default async function Page({ params }: ContentRouteProps) {
  const { locale: localeParam, slug } = await params;
  const { locale, page } = assertRoute(localeParam, slug);
  const dict = await getDictionary(locale);
  const childContent =
    page.key === "pricing" ? (
      <PricingTable labels={dict.pricingTable} />
    ) : page.key === "booking" ? (
      <BookingForm labels={dict.bookingForm} locale={locale} />
    ) : null;

  return (
    <ContentPage copy={dict.pages[page.key]} links={ctaLinks(page.key, locale)}>
      {childContent}
    </ContentPage>
  );
}

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export const pageRegistry = [
  { slug: "car", key: "car", navKey: "car" },
  { slug: "pricing", key: "pricing", navKey: "pricing" },
  { slug: "availability", key: "availability", navKey: "availability" },
  { slug: "book", key: "booking", navKey: "booking" },
  {
    slug: "batumi-airport-car-rental",
    key: "airport",
    navKey: "airport",
  },
  { slug: "hotel-delivery-batumi", key: "hotel", navKey: "hotel" },
  {
    slug: "long-term-car-rental-batumi",
    key: "longTerm",
    navKey: "longTerm",
  },
  { slug: "faq", key: "faq", navKey: "faq" },
  { slug: "terms", key: "terms", navKey: "terms" },
  { slug: "privacy", key: "privacy", navKey: "privacy" },
  { slug: "contact", key: "contact", navKey: "contact" },
] as const satisfies readonly {
  slug: string;
  key: keyof Dictionary["pages"];
  navKey: keyof Dictionary["nav"];
}[];

export type PageEntry = (typeof pageRegistry)[number];
export type PageSlug = PageEntry["slug"];

export function homePath(locale: Locale): `/${Locale}` {
  return `/${locale}`;
}

export function pagePath(locale: Locale, slug: string): `/${Locale}/${string}` {
  return `/${locale}/${slug}`;
}

export function getPageBySlug(slug: string): PageEntry | undefined {
  return pageRegistry.find((page) => page.slug === slug);
}

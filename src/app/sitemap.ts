import type { MetadataRoute } from "next";

import { homePath, pagePath, pageRegistry } from "@/content/routes";
import { locales } from "@/i18n/config";
import { env } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) => [
    {
      url: `${env.NEXT_PUBLIC_SITE_URL}${homePath(locale)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...pageRegistry.map((page) => ({
      url: `${env.NEXT_PUBLIC_SITE_URL}${pagePath(locale, page.slug)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: page.slug === "book" ? 0.9 : 0.8,
    })),
  ]);
}

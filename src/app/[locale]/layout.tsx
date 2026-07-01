import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FixedWhatsAppButton } from "@/components/fixed-whatsapp-button";
import { MobileContactBar } from "@/components/mobile-contact-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { homePath } from "@/content/routes";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { env } from "@/lib/env";

import "../globals.css";

type LocaleLayoutProps = {
  children: React.ReactNode;
} & LocaleRouteProps;

type LocaleRouteProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleRouteProps): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    title: {
      default: dict.home.meta.title,
      template: `%s | ${dict.meta.siteName}`,
    },
    description: dict.meta.siteDescription,
    openGraph: {
      title: dict.home.meta.title,
      description: dict.meta.siteDescription,
      locale,
      siteName: dict.meta.siteName,
      type: "website",
      images: [
        {
          url: "/batumi-private-car-hero.png",
          width: 1600,
          height: 1200,
          alt: dict.home.hero.imageAlt,
        },
      ],
    },
    alternates: {
      canonical: homePath(locale),
      languages: Object.fromEntries(
        locales.map((supportedLocale) => [
          supportedLocale,
          homePath(supportedLocale),
        ]),
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        <div className="flex min-h-screen flex-col bg-white pb-20 text-slate-950 md:pb-0">
          <SiteHeader dict={dict} locale={locale} />
          <div className="flex-1">{children}</div>
          <SiteFooter dict={dict} locale={locale} />
          <FixedWhatsAppButton labels={dict.contactLinks} />
          <MobileContactBar labels={dict.contactLinks} />
        </div>
      </body>
    </html>
  );
}

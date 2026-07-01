import "server-only";

import type { Locale } from "./config";
import en from "./messages/en.json";

export type Dictionary = typeof en;

const dictionaries = {
  en: () => import("./messages/en.json").then((module) => module.default),
  ru: () => import("./messages/ru.json").then((module) => module.default),
  tr: () => import("./messages/tr.json").then((module) => module.default),
  ka: () => import("./messages/ka.json").then((module) => module.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

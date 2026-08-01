import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const locales = ["en", "ru", "tr", "ka"] as const;
const messagesDir = path.join(process.cwd(), "src", "i18n", "messages");

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function readMessages(locale: (typeof locales)[number]): JsonValue {
  const filePath = path.join(messagesDir, `${locale}.json`);

  expect(existsSync(filePath), `${locale}.json should exist`).toBe(true);

  return JSON.parse(readFileSync(filePath, "utf8")) as JsonValue;
}

function keyPaths(value: JsonValue, prefix = ""): string[] {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return [prefix];
    }

    return value.flatMap((child, index) =>
      keyPaths(child, `${prefix}[${index}]`),
    );
  }

  if (value === null || typeof value !== "object") {
    return [prefix];
  }

  if (Object.keys(value).length === 0) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    keyPaths(child, prefix ? `${prefix}.${key}` : key),
  );
}

function textValues(value: JsonValue): string[] {
  if (Array.isArray(value)) {
    return value.flatMap(textValues);
  }

  if (value !== null && typeof value === "object") {
    return Object.values(value).flatMap(textValues);
  }

  return typeof value === "string" ? [value] : [];
}

function placeholders(value: string): string[] {
  return [...value.matchAll(/\{([^{}]+)\}/g)].map((match) => match[1]).sort();
}

function textByPath(
  value: JsonValue,
  prefix = "",
  result: Record<string, string> = {},
): Record<string, string> {
  if (Array.isArray(value)) {
    value.forEach((child, index) =>
      textByPath(child, `${prefix}[${index}]`, result),
    );
    return result;
  }

  if (value !== null && typeof value === "object") {
    Object.entries(value).forEach(([key, child]) =>
      textByPath(child, prefix ? `${prefix}.${key}` : key, result),
    );
    return result;
  }

  if (typeof value === "string") {
    result[prefix] = value;
  }

  return result;
}

describe("translation files", () => {
  it("defines identical message key paths for every public locale", () => {
    const [defaultLocale, ...otherLocales] = locales;
    const defaultKeys = keyPaths(readMessages(defaultLocale)).sort();

    for (const locale of otherLocales) {
      expect(keyPaths(readMessages(locale)).sort()).toEqual(defaultKeys);
    }
  });

  it("does not contain empty public messages", () => {
    for (const locale of locales) {
      for (const value of textValues(readMessages(locale))) {
        expect(value.trim(), `${locale} contains an empty message`).not.toBe(
          "",
        );
      }
    }
  });

  it("preserves interpolation placeholders in every locale", () => {
    const defaultMessages = textByPath(readMessages("en"));

    for (const locale of locales.slice(1)) {
      const messages = textByPath(readMessages(locale));

      for (const [key, defaultValue] of Object.entries(defaultMessages)) {
        expect(placeholders(messages[key]), `${locale}: ${key}`).toEqual(
          placeholders(defaultValue),
        );
      }
    }
  });

  it("does not regress to known English fallback phrases", () => {
    const forbiddenFragments: Record<(typeof locales)[number], RegExp[]> = {
      en: [],
      ru: [
        /\bautomatic\b/i,
        /\bpetrol\b/i,
        /\bpickup\b/i,
        /\brequest-to-book\b/i,
      ],
      tr: [/\bautomatic\b/i, /\bpetrol\b/i, /\brequest-to-book\b/i],
      ka: [/\bautomatic\b/i, /\bpetrol\b/i, /\brequest-to-book\b/i],
    };

    for (const locale of locales.slice(1)) {
      const values = textValues(readMessages(locale));

      for (const fragment of forbiddenFragments[locale]) {
        expect(
          values.filter((value) => fragment.test(value)),
          `${locale} contains ${fragment}`,
        ).toEqual([]);
      }
    }
  });
});

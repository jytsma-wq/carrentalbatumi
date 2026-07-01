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

describe("translation files", () => {
  it("defines identical message key paths for every public locale", () => {
    const [defaultLocale, ...otherLocales] = locales;
    const defaultKeys = keyPaths(readMessages(defaultLocale)).sort();

    for (const locale of otherLocales) {
      expect(keyPaths(readMessages(locale)).sort()).toEqual(defaultKeys);
    }
  });
});

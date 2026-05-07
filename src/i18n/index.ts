import en from "./en";
import ja from "./ja";
import type { Locale } from "./config";

const dictionaries = { en, ja } as const;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { locales, defaultLocale, isLocale, localeLabels } from "./config";
export type { Locale } from "./config";

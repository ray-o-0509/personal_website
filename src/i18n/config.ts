export const locales = ["en", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ja";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  ja: "JA",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

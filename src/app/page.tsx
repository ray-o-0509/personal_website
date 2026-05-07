import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

function pickLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const tags = acceptLanguage
    .split(",")
    .map((entry) => {
      const [tag, q] = entry.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of tags) {
    const primary = tag.split("-")[0] as Locale;
    if ((locales as readonly string[]).includes(primary)) return primary;
  }
  return defaultLocale;
}

export default async function RootPage() {
  const headerList = await headers();
  const locale = pickLocale(headerList.get("accept-language"));
  redirect(`/${locale}`);
}

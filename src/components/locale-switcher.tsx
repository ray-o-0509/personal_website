"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import posthog from "posthog-js";
import { locales, type Locale, localeLabels } from "@/i18n/config";

export function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  const swap = (target: Locale) => {
    if (!pathname) return `/${target}`;
    const segments = pathname.split("/");
    // segments[0] === "" because pathname starts with "/"
    if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = target;
      return segments.join("/") || `/${target}`;
    }
    return `/${target}${pathname}`;
  };

  return (
    <div className="flex items-center gap-1 font-mono text-[11px] tracking-[0.16em]">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-40">/</span>}
          {l === current ? (
            <span className="text-[var(--ink)]" aria-current="true">
              {localeLabels[l]}
            </span>
          ) : (
            <Link
              href={swap(l)}
              className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
              hrefLang={l}
              onClick={() => posthog.capture("locale_switched", { from: current, to: l })}
            >
              {localeLabels[l]}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}

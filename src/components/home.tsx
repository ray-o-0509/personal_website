"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LocaleSwitcher } from "./locale-switcher";
import { ContactForm } from "./contact-form";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

export default function Home({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [time, setTime] = useState({ tokyo: "—:—", cambridge: "—:—" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
    const tick = () => {
      const now = new Date();
      setTime({
        tokyo: now.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Tokyo",
          hour: "2-digit",
          minute: "2-digit",
        }),
        cambridge: now.toLocaleTimeString("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [locale]);

  const NAV = [
    { label: dict.nav.about, href: "#about" },
    { label: dict.nav.projects, href: "#projects" },
    { label: dict.nav.work, href: "#work" },
    { label: dict.nav.contact, href: "#contact" },
  ];

  return (
    <div className="grain min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <Topbar time={time} mounted={mounted} nav={NAV} locale={locale} />

      {/* HERO */}
      <section
        id="top"
        className="relative mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16 pt-28 sm:pt-36 lg:pt-48 pb-16 sm:pb-20 lg:pb-28"
      >
        <div className="enter enter-d1">
          <Eyebrow
            number="01"
            label={dict.hero.sectionLabel}
            right={dict.hero.eyebrow}
          />
        </div>

        <h1 className="font-serif tracking-[-0.02em] leading-[0.92] mt-8 sm:mt-10">
          <span className="mask text-[15vw] sm:text-[11vw] lg:text-[150px]">
            <span className="mask-inner mask-d1">{dict.hero.name}</span>
          </span>
          <span className="mask italic font-light text-[var(--muted)] text-[6vw] sm:text-[4vw] lg:text-[44px] mt-2 sm:mt-3 leading-tight">
            <span className="mask-inner mask-d3">{dict.hero.nameSub}</span>
          </span>
        </h1>

        <div className="mt-12 sm:mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="enter enter-d4 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm text-[var(--bg)] transition-colors hover:bg-[var(--accent-deep)]"
              >
                {dict.hero.ctaPrimary}
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--ink)]/20 px-5 py-2.5 text-sm transition-colors hover:border-[var(--ink)] hover:bg-[var(--surface)]"
              >
                {dict.hero.ctaSecondary}
              </a>
            </div>
          </div>

          <aside className="enter enter-d4 lg:col-span-5 lg:pl-10 lg:border-l lg:border-[var(--line)]">
            <p className="text-[11px] tracking-[0.2em] text-[var(--muted)] font-mono mb-4">
              {dict.hero.currentlyLabel}
            </p>
            <ul className="space-y-2 text-sm">
              {dict.hero.now.map((n, i) => (
                <NowItem
                  key={i}
                  left={n.left}
                  org={n.org}
                  right={n.right}
                  delay={0.6 + i * 0.07}
                />
              ))}
            </ul>

            <p className="text-[11px] tracking-[0.2em] text-[var(--muted)] font-mono mt-8 mb-4">
              {dict.recognition.label}
            </p>
            <ul className="space-y-2 text-sm">
              {dict.recognition.items.map((h, i) => (
                <li
                  key={h.title}
                  style={{ animationDelay: `${0.85 + i * 0.06}s` }}
                  className="stagger flex items-baseline justify-between gap-4 border-b border-dashed border-[var(--line)] pb-2"
                >
                  <span>{h.title}</span>
                  <span className="text-[var(--muted)] font-mono text-xs shrink-0">
                    {stripYear(h.note)}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" number="02" label={dict.about.label}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">
          <h2 className="font-serif text-[8vw] sm:text-5xl lg:text-[64px] leading-[1.05] tracking-[-0.01em] lg:col-span-5">
            {dict.about.heading_pre}
            <em className="italic">{dict.about.heading_em}</em>
            {dict.about.heading_post}
          </h2>
          <div className="lg:col-span-7 space-y-5 text-[15px] sm:text-base leading-relaxed">
            <p>
              {dict.about.p1_pre}
              <em className="italic">{dict.about.p1_em}</em>
              {dict.about.p1_mid}
              <a
                href={dict.about.p1_link_href}
                target="_blank"
                rel="noreferrer"
                className="border-b border-[var(--ink)]/40 hover:border-[var(--ink)] transition-colors"
              >
                {dict.about.p1_link_label}
              </a>
              {dict.about.p1_post}
            </p>
            <p>
              {dict.about.p2_pre}
              <em className="italic">{dict.about.p2_em1}</em>
              {dict.about.p2_mid}
              <em className="italic">{dict.about.p2_em2}</em>
              {dict.about.p2_mid2}
              <em className="italic">{dict.about.p2_em3}</em>
              {dict.about.p2_post}
            </p>
            <p className="text-[var(--muted)]">{dict.about.p3}</p>
          </div>
        </div>
      </Section>

      {/* VISION */}
      <Section number="03" label={dict.vision.label}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">
          <h2 className="font-serif text-[8vw] sm:text-5xl lg:text-[64px] leading-[1.05] tracking-[-0.01em] lg:col-span-5">
            {dict.vision.heading_pre}
            <em className="italic">{dict.vision.heading_em}</em>
            {dict.vision.heading_post}
          </h2>
          <div className="lg:col-span-7 space-y-5 text-[15px] sm:text-base leading-relaxed">
            <p>{dict.vision.p1}</p>
            <p>{dict.vision.p2}</p>
            <p className="text-[var(--muted)]">{dict.vision.p3}</p>
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" number="04" label={dict.projects.label}>
        <h2 className="sr-only">{dict.projects.label}</h2>
        <div className="space-y-20 sm:space-y-24">
          {dict.projects.items.map((p, i) => (
            <article
              key={p.title}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12"
            >
              <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
                <span className="text-[11px] tracking-[0.2em] text-[var(--muted)] font-mono">
                  {String(i + 1).padStart(2, "0")} · {p.year}
                </span>
                <h3 className="font-serif text-4xl sm:text-5xl leading-[1.05] mt-3 tracking-[-0.01em]">
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--muted)] italic mt-2">
                  {p.subtitle}
                </p>
              </div>
              <div className="lg:col-span-8 lg:pl-12 lg:border-l lg:border-[var(--line)]">
                <p className="text-[15px] sm:text-base leading-relaxed max-w-2xl">
                  {p.description}
                </p>
                <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 max-w-xl">
                  {p.stats.map((s) => (
                    <li
                      key={s}
                      className="flex items-baseline gap-3 text-sm"
                    >
                      <span className="text-[var(--accent-deep)] translate-y-[-1px]">
                        ●
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                {"link" in p && p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 border-b border-[var(--ink)]/40 pb-0.5 text-sm hover:border-[var(--ink)] transition-colors"
                  >
                    {p.linkLabel}
                    <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="work" number="05" label={dict.work.label}>
        <h2 className="font-serif text-[8vw] sm:text-5xl lg:text-[64px] mb-10 sm:mb-12 leading-[1.05] tracking-[-0.01em]">
          {dict.work.heading}
        </h2>
        <ul>
          {dict.work.items.map((e, i) => (
            <li
              key={i}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              className="stagger grid grid-cols-12 gap-3 lg:gap-8 py-6 sm:py-7 border-t border-[var(--line)] last:border-b"
            >
              <span className="col-span-12 sm:col-span-3 text-sm text-[var(--muted)] font-mono pt-1">
                {e.period}
              </span>
              <div className="col-span-12 sm:col-span-9">
                <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4 gap-y-1">
                  <h3 className="font-serif text-2xl sm:text-3xl leading-tight">
                    {e.role}
                  </h3>
                  <span className="text-base text-[var(--muted)]">
                    / {e.org}
                  </span>
                  {"subOrg" in e && e.subOrg && (
                    <span className="text-xs text-[var(--muted)] italic">
                      ({e.subOrg})
                    </span>
                  )}
                  <span className="text-xs text-[var(--muted)] sm:ml-auto font-mono">
                    {e.location}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed max-w-3xl">
                  {e.note.split("<br>").map((part, idx, arr) => (
                    <span key={idx}>
                      {part}
                      {idx < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* HONORS */}
      <Section number="06" label={dict.recognition.label}>
        <h2 className="sr-only">{dict.recognition.label}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-12 gap-y-6">
          {dict.recognition.items.map((h, i) => (
            <li
              key={h.title}
              style={{ animationDelay: `${0.15 + i * 0.06}s` }}
              className="stagger flex flex-col border-l-2 border-[var(--accent-deep)] pl-5 py-1"
            >
              <span className="font-serif text-xl sm:text-2xl tracking-[-0.005em]">
                {h.title}
              </span>
              <span className="text-xs text-[var(--muted)] mt-1 font-mono tracking-wider">
                {h.note}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* EDUCATION */}
      <Section number="07" label={dict.education.label}>
        <h2 className="sr-only">{dict.education.label}</h2>
        <ul className="space-y-8 sm:space-y-10">
          {dict.education.items.map((e, i) => (
            <li
              key={e.school}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              className="stagger grid grid-cols-12 gap-3 lg:gap-8 items-baseline"
            >
              <span className="col-span-12 sm:col-span-3 text-sm text-[var(--muted)] font-mono">
                {e.period}
              </span>
              <div className="col-span-12 sm:col-span-9">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="font-serif text-2xl sm:text-3xl tracking-[-0.005em]">
                    {e.school}
                  </h3>
                  {"current" in e && e.current && (
                    <span className="text-[10px] tracking-[0.18em] font-mono px-2 py-0.5 bg-[var(--accent-deep)] text-[var(--bg)] rounded">
                      {dict.education.currentBadge}
                    </span>
                  )}
                </div>
                {e.college && (
                  <p className="text-sm text-[var(--muted)] mt-1 italic">
                    {e.college}
                  </p>
                )}
                <p className="text-sm mt-1">{e.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* MEDIA */}
      <Section number="08" label={dict.media.label}>
        <h2 className="sr-only">{dict.media.label}</h2>
        <MediaList
          items={dict.media.items}
          showMoreLabel={dict.media.showMore}
          showLessLabel={dict.media.showLess}
        />
      </Section>

      {/* SKILLS */}
      <Section number="09" label={dict.toolkit.label}>
        <h2 className="sr-only">{dict.toolkit.label}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
          {dict.toolkit.groups.map((g) => (
            <div key={g.group}>
              <h3 className="font-serif text-3xl mb-5 sm:mb-6 tracking-[-0.01em]">
                {g.group}
              </h3>
              <ul className="space-y-3.5">
                {g.items.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-center justify-between gap-4 text-sm border-b border-dashed border-[var(--line)] pb-3"
                  >
                    <span>{s.name}</span>
                    <span className="flex gap-1.5 shrink-0">
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <span
                          key={idx}
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            idx < s.level
                              ? "bg-[var(--ink)]"
                              : "bg-[var(--line)]"
                          }`}
                        />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <ContactFooter dict={dict} />
    </div>
  );
}

/* ---------- small components ---------- */

function ContactFooter({ dict }: { dict: Dictionary }) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <footer
      ref={ref}
      id="contact"
      className={`reveal ${
        visible ? "is-visible" : ""
      } mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32 border-t border-[var(--line)]`}
    >
      <Eyebrow number="10" label={dict.contact.label} />

      <h2 className="font-serif text-[14vw] sm:text-7xl lg:text-[120px] leading-[0.95] tracking-[-0.02em] mt-8 sm:mt-10">
        {dict.contact.heading}
      </h2>

      <div className="mt-10 sm:mt-12">
        <ContactForm dict={dict.contact.form} />
      </div>

      <div className="mt-16 sm:mt-20 flex flex-wrap items-baseline justify-between gap-4 text-xs text-[var(--muted)] font-mono">
        <span>© {new Date().getFullYear()} Ray Otsuka</span>
        <a
          href="#top"
          className="border-b border-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)] transition-colors"
        >
          {dict.contact.backToTop}
        </a>
      </div>
    </footer>
  );
}

function Topbar({
  time,
  mounted,
  nav,
  locale,
}: {
  time: { tokyo: string; cambridge: string };
  mounted: boolean;
  nav: { label: string; href: string }[];
  locale: Locale;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  // close menu when resizing to desktop, lock body scroll while open
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  // close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <div className="enter-fade fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--line)]/60">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16 h-14 flex items-center justify-between text-xs gap-3 sm:gap-4">
          <a
            href="#top"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 sm:gap-2.5 font-mono tracking-tight shrink-0"
          >
            <Image
              src="/logo.png"
              alt="Ray Otsuka logo"
              width={22}
              height={22}
              priority
              className="h-5 w-5 sm:h-[22px] sm:w-[22px] object-contain"
            />
            <span className="font-medium tracking-[0.04em]">RAY OTSUKA</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 font-mono tracking-[0.12em] text-[var(--muted)]">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="link-slide hover:text-[var(--ink)] transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="hidden lg:flex items-center gap-3 font-mono text-[var(--muted)]">
              <span>TYO {mounted ? time.tokyo : "—"}</span>
              <span className="opacity-50">/</span>
              <span>CAM {mounted ? time.cambridge : "—"}</span>
            </div>
            <span className="hidden lg:inline-block h-3 w-px bg-[var(--line)]" />
            <div className="hidden md:block">
              <LocaleSwitcher current={locale} />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden relative h-9 w-9 flex items-center justify-center -mr-1.5 rounded-full hover:bg-[var(--surface)] transition-colors"
            >
              <Hamburger open={menuOpen} />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        nav={nav}
        locale={locale}
        time={time}
        mounted={mounted}
      />
    </>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative block h-3.5 w-5">
      <span
        className={`absolute left-0 right-0 h-px bg-[var(--ink)] transition-all duration-300 ease-out ${
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-[var(--ink)] transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 right-0 h-px bg-[var(--ink)] transition-all duration-300 ease-out ${
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
        }`}
      />
    </span>
  );
}

function MobileMenu({
  open,
  onClose,
  nav,
  locale,
  time,
  mounted,
}: {
  open: boolean;
  onClose: () => void;
  nav: { label: string; href: string }[];
  locale: Locale;
  time: { tokyo: string; cambridge: string };
  mounted: boolean;
}) {
  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      className={`md:hidden fixed inset-0 z-40 bg-[var(--bg)] transition-[opacity,transform] duration-300 ease-out ${
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="h-full flex flex-col px-5 pt-20 pb-10">
        <nav className="flex-1 flex flex-col justify-center">
          <ul className="space-y-1">
            {nav.map((n, i) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={onClose}
                  className="flex items-baseline gap-5 py-2 group"
                >
                  <span className="text-[11px] tracking-[0.2em] text-[var(--muted)] font-mono pt-3">
                    — {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-5xl sm:text-6xl tracking-[-0.02em] leading-tight transition-colors group-hover:text-[var(--accent-deep)]">
                    {n.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-[var(--line)] pt-5 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-2.5 text-[var(--muted)] tracking-[0.16em]">
            <span>TYO {mounted ? time.tokyo : "—"}</span>
            <span className="opacity-50">/</span>
            <span>CAM {mounted ? time.cambridge : "—"}</span>
          </div>
          <LocaleSwitcher current={locale} />
        </div>
      </div>
    </div>
  );
}

function Eyebrow({
  number,
  label,
  right,
}: {
  number: string;
  label?: string;
  right?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] tracking-[0.2em] text-[var(--muted)] font-mono">
      <span>— {number}</span>
      <span className="h-px w-10 bg-[var(--ink)] line-draw" />
      {label && <span>{label}</span>}
      {right && <span className="ml-auto">{right}</span>}
    </div>
  );
}

function Section({
  id,
  number,
  label,
  children,
}: {
  id?: string;
  number: string;
  label: string;
  children: React.ReactNode;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      id={id}
      className={`reveal ${
        visible ? "is-visible" : ""
      } mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32 border-t border-[var(--line)]/70`}
    >
      <div className="mb-10 sm:mb-12">
        <Eyebrow number={number} label={label} />
      </div>
      {children}
    </section>
  );
}

function NowItem({
  left,
  org,
  right,
  delay = 0,
}: {
  left: string;
  org: string;
  right: string;
  delay?: number;
}) {
  return (
    <li
      style={{ animationDelay: `${delay}s` }}
      className="stagger flex items-baseline justify-between gap-4 border-b border-dashed border-[var(--line)] pb-2"
    >
      <span>
        {left}{" "}
        <span className="text-[var(--muted)]">
          @ <span className="italic">{org}</span>
        </span>
      </span>
      <span className="text-[var(--muted)] font-mono text-xs shrink-0">
        {right}
      </span>
    </li>
  );
}

function MediaList({
  items,
  showMoreLabel,
  showLessLabel,
}: {
  items: Dictionary["media"]["items"];
  showMoreLabel: string;
  showLessLabel: string;
}) {
  const PREVIEW = 4;
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, PREVIEW);
  const hasMore = items.length > PREVIEW;

  return (
    <>
      <ul>
        {visible.map((m, i) => (
          <li
            key={m.url}
            style={{ animationDelay: `${0.15 + i * 0.06}s` }}
            className="stagger border-t border-[var(--line)] last:border-b"
          >
            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-12 gap-3 lg:gap-8 py-5 sm:py-6 group transition-colors hover:bg-[var(--surface)] -mx-3 sm:-mx-5 px-3 sm:px-5 rounded-sm"
            >
              <span className="col-span-12 sm:col-span-3 text-[11px] tracking-[0.16em] text-[var(--muted)] font-mono pt-1 self-start">
                {m.outlet}
              </span>
              <span className="col-span-11 sm:col-span-8 font-serif text-base sm:text-lg leading-snug tracking-[-0.005em] group-hover:text-[var(--accent-deep)] transition-colors">
                {m.title}
              </span>
              <span
                aria-hidden
                className="col-span-1 self-start text-[var(--muted)] group-hover:text-[var(--accent-deep)] group-hover:translate-x-0.5 transition-[color,transform] text-right pt-1"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--ink)]/20 px-5 py-2.5 text-sm transition-colors hover:border-[var(--ink)] hover:bg-[var(--surface)]"
          >
            {expanded ? showLessLabel : showMoreLabel}
            <span
              aria-hidden
              className={`transition-transform ${
                expanded ? "rotate-180" : ""
              } group-hover:translate-y-0.5`}
            >
              ↓
            </span>
          </button>
        </div>
      )}
    </>
  );
}

/* ---------- helpers ---------- */

function stripYear(note: string): string {
  // remove a trailing " · YYYY" segment, e.g. " · 2017" or " · 2021"
  return note.replace(/\s*·\s*\d{4}\b/g, "").trim();
}

/* ---------- hooks ---------- */

function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // already in view at mount? show immediately
    const initial = el.getBoundingClientRect();
    if (initial.top < window.innerHeight && initial.bottom > 0) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-80px 0px", threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

"use client";

import { useRef, useState } from "react";
import type { Dictionary } from "@/i18n";

type FormDict = Dictionary["contact"]["form"];
type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ dict }: { dict: FormDict }) {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
      _hp: String(data.get("_hp") || ""),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  const disabled = status === "sending" || status === "success";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7 max-w-2xl"
      noValidate
    >
      <Field name="name" label={dict.name} disabled={disabled} required />
      <Field
        name="email"
        type="email"
        label={dict.email}
        disabled={disabled}
        required
      />
      <Field
        name="message"
        label={dict.message}
        disabled={disabled}
        required
        textarea
        className="sm:col-span-2"
      />

      {/* honeypot — hidden from real users, bots will fill it */}
      <input
        type="text"
        name="_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="sm:col-span-2 flex flex-wrap items-center gap-x-5 gap-y-3 mt-2">
        <button
          type="submit"
          disabled={disabled}
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm text-[var(--bg)] transition-colors hover:bg-[var(--accent)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? dict.sending : dict.send}
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>
        <p
          aria-live="polite"
          className={`text-sm transition-opacity ${
            status === "success"
              ? "text-[var(--accent)] opacity-100"
              : status === "error"
                ? "text-[var(--highlight)] opacity-100"
                : "opacity-0"
          }`}
        >
          {status === "success"
            ? dict.success
            : status === "error"
              ? dict.error
              : "—"}
        </p>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  required,
  type = "text",
  textarea = false,
  disabled = false,
  className = "",
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const baseInput =
    "w-full bg-transparent border-b border-[var(--ink)]/20 focus:border-[var(--ink)] outline-none py-2 text-base transition-colors placeholder:text-[var(--muted)]/50 disabled:opacity-50";
  return (
    <label className={`block ${className}`}>
      <span className="block text-[11px] tracking-[0.2em] text-[var(--muted)] font-mono mb-2">
        {label}
        {required && <span className="text-[var(--accent)]"> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          disabled={disabled}
          rows={5}
          className={`${baseInput} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          disabled={disabled}
          className={baseInput}
        />
      )}
    </label>
  );
}

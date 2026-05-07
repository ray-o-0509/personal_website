import { NextResponse } from "next/server";

/**
 * Contact form handler.
 *
 * Forwards validated submissions to FormSubmit (https://formsubmit.co), which
 * delivers the email without requiring an API key. On the very FIRST submission
 * after deploy, FormSubmit will send a one-time activation link to the
 * recipient — clicking it enables future deliveries.
 *
 * To swap in another provider (Resend, Postmark, etc.), set CONTACT_FORWARD_URL
 * in your environment and adjust the request body shape below.
 */

const RECIPIENT = "rayrayo0509.developer@gmail.com";
const FORWARD_URL =
  process.env.CONTACT_FORWARD_URL ?? `https://formsubmit.co/ajax/${RECIPIENT}`;

const isString = (v: unknown): v is string => typeof v === "string";
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { name, email, message, _hp } = body as Record<string, unknown>;

  // honeypot — bots tend to fill every field, real users never see it
  if (isString(_hp) && _hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (
    !isString(name) ||
    name.trim().length === 0 ||
    name.length > 200 ||
    !isString(email) ||
    !isEmail(email) ||
    email.length > 200 ||
    !isString(message) ||
    message.trim().length === 0 ||
    message.length > 5000
  ) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  try {
    const res = await fetch(FORWARD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _subject: `New message from ${name.trim()} via rayotsuka.com`,
        _replyto: email.trim(),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[contact] forward failed", res.status, text);
      return NextResponse.json({ error: "forward_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] network error", err);
    return NextResponse.json({ error: "network_error" }, { status: 500 });
  }
}

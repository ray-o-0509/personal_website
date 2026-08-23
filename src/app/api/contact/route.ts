import { NextResponse } from "next/server";
import { Resend } from "resend";
import { captureServerEvent } from "@/lib/posthog-server";

const RECIPIENT = "rayrayo0509.developer@gmail.com";

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

  // Instantiate lazily at request time — evaluating this at module load would
  // crash the build (page-data collection) in any environment without the key.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: RECIPIENT,
      replyTo: email.trim(),
      subject: `New message from ${name.trim()} via rayotsuka.com`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    });

    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    await captureServerEvent({
      distinctId: email.trim(),
      event: "contact_message_sent",
      properties: {
        name: name.trim(),
        message_length: message.trim().length,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] network error", err);
    return NextResponse.json({ error: "network_error" }, { status: 500 });
  }
}

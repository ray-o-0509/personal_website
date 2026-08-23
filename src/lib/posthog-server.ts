import { PostHog, type EventMessage } from "posthog-node";

const DEFAULT_HOST = "https://eu.i.posthog.com";

let client: PostHog | null = null;

/**
 * Server-side PostHog client, or `null` when analytics is not configured.
 * The token is absent in local dev and in CI, so callers must handle `null`
 * rather than assuming analytics is always available.
 */
export function getPostHogClient(): PostHog | null {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token) return null;

  if (!client) {
    client = new PostHog(token, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? DEFAULT_HOST,
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return client;
}

/**
 * Capture a server-side event as best-effort telemetry: it flushes before
 * resolving (a serverless instance can freeze the moment the response is
 * returned, dropping anything still queued) and never throws, so a failure
 * in analytics can never turn a successful request into an error response.
 */
export async function captureServerEvent(event: EventMessage): Promise<void> {
  const posthog = getPostHogClient();
  if (!posthog) return;

  try {
    posthog.capture(event);
    await posthog.flush();
  } catch (err) {
    console.error("[posthog] failed to capture", event.event, err);
  }
}

import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

// The token is absent in local dev and in CI — skip init there rather than
// initialising with `undefined`, which leaves posthog-js in a broken state.
if (token) {
  posthog.init(token, {
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
    // Include the defaults option as required by PostHog
    defaults: "2026-01-30",
    // Enables capturing unhandled exceptions via Error Tracking
    capture_exceptions: true,
    // Turn on debug in development mode
    debug: process.env.NODE_ENV === "development",
  });
} else if (process.env.NODE_ENV === "development") {
  console.warn(
    "[posthog] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is not set — analytics is disabled"
  );
}

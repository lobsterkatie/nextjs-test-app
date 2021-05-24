console.log("in sentry.client.config.js");
import * as Sentry from "@sentry/nextjs";
import * as SentryTracing from "@sentry/tracing";

Sentry.init({
  dsn: "https://c3d3206b71704aebbe717d5d4dbfe0bd@o87286.ingest.sentry.io/5397699",
  debug: true,
  // release: "off.leash.trail",
  tracesSampleRate: 1,
  tracingOrigins: ["*"],
  autoSessionTracking: false,
  integrations: [new SentryTracing.Integrations.BrowserTracing()],
  beforeSend: (event) => {
    console.log("in browser beforeSend!");
    // return null;
    console.log(event);
    event.fingerprint = [Date.now()];
    return event;
  },
});

Sentry.init();

// NEED BROWSER TRACING INTEGRATION!!

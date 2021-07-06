import * as Sentry from "@sentry/nextjs";
// const Sentry = require("@sentry/nextjs");
// debugger;

console.log("calling Sentry.init()");

Sentry.init({
  dsn: "https://c3d3206b71704aebbe717d5d4dbfe0bd@o87286.ingest.sentry.io/5397699",
  debug: true,
  // release: "off.leash.trail",
  tracesSampleRate: 1,
  autoSessionTracking: false,
  integrations: (defaults) => [
    ...defaults.filter(
      (integration) =>
        // filter out Http so its options can be changed below (otherwise, first one wins)
        integration.name !== "Console" && integration.name !== "Http"
    ),
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
  ],
  beforeSend: (event) => {
    console.log("in server beforeSend!");
    // return null;
    // console.log(event);
    event.fingerprint = [Date.now()];
    return event;
  },
});

// Sentry.captureException(new Error("kangaroo"));

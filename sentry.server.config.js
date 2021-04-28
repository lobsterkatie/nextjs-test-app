import * as Sentry from "@sentry/nextjs";
// debugger;

Sentry.init({
  dsn:
    "https://c3d3206b71704aebbe717d5d4dbfe0bd@o87286.ingest.sentry.io/5397699",
  debug: true,
  // release: "off.leash.trail",
  tracesSampleRate: 1,
  autoSessionTracking: false,
  beforeSend: (event) => {
    console.log("in server beforeSend!");
    // return null;
    console.log(event);
    event.fingerprint = [Date.now()];
    return event;
  },
});

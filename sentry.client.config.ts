// console.log("in sentry.client.config.js");
import * as Sentry from "@sentry/nextjs";
import * as SentryPolyfills from "@sentry/utils/esm/buildPolyfills";
// import * as SentryTracing from "@sentry/tracing";
import getConfig from "next/config";
// import { RewriteFrames } from "@sentry/integrations";

console.log({ SentryPolyfills: Object.keys(SentryPolyfills) });
debugger;

const { publicRuntimeConfig } = getConfig();
// console.log("runtime config");
// console.log(publicRuntimeConfig);
// debugger;

console.log("calling Sentry.init()");

Sentry.init({
  dsn: "https://c3d3206b71704aebbe717d5d4dbfe0bd@o87286.ingest.sentry.io/5397699",
  debug: true,
  // release: "off.leash.trail",
  tracesSampleRate: 1,
  //   tracesSampler: (samplingContext) => {
  //     if (samplingContext.parentSampled) {
  //       return true
  //     }
  //
  //     return false
  //   },
  autoSessionTracking: false,
  // integrations: [
  //   new SentryTracing.Integrations.BrowserTracing({ tracingOrigins: [".*"] }),
  // ],
  beforeSend: (event) => {
    console.log("in browser beforeSend!");
    // return null;
    console.log(event);
    event.fingerprint = [String(Date.now())];
    return event;
  },
});

Sentry.addGlobalEventProcessor((event) => {
  // make any changes to event data that you'd like here
  return event;
});

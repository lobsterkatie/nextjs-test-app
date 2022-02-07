import * as Sentry from "@sentry/nextjs";
// const Sentry = require("@sentry/nextjs");
// import getConfig from "next/config";
// import * as simple from "./pages/simple";
// import * as otherPage from "./pages/level-one/other-page";

// const { publicRuntimeConfig } = getConfig();
// console.log("runtime config");
// console.log(publicRuntimeConfig);

console.log("calling Sentry.init()");
Error.stackTraceLimit = Infinity;

// debugger;

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
    debugger;
    event.contexts.device = { model: "iPhone 13 mini", family: "iPhone" };
    try {
      console.log("Exception:", event.exception.values[0].value);
      event.exception.values[0].mechanism.description =
        "This means the exception which was caught was not an instance of `Error`, and didn't have a stacktrace. Instead we've used the stacktrace leading to the point where the exception was captured, if available.";
    } catch (error) {
      // pass
    }
    // // return null;
    // console.log(event);
    event.fingerprint = [Date.now()];
    return event;
  },
});

// Sentry.captureException(new Error("kangaroo"));

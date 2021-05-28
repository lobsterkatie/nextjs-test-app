import "../styles/globals.css";
console.log("top top of _app.js");
// import {
//   clientConfig as sentryBrowserConfig,
//   serverConfig as sentryServerConfig,
// } from "@sentry/next-plugin-sentry";
// const sentryServerConfig = { num: 5 };
// const sentryBrowserConfig = { num: 6 };

// console.log("top of _app.js", sentryServerConfig);

import * as Sentry from "@sentry/nextjs";

import * as nextRouter from "next/router";

import piglatin from "pig-latin";

// init({
//   dsn:
//     "https://c3d3206b71704aebbe717d5d4dbfe0bd@o87286.ingest.sentry.io/5397699",
//   debug: true,
//   dev: true,
// });

// Sentry.captureMessage("in _app.js");

function MyApp({ Component, pageProps }) {
  console.log(
    `\n${piglatin("I'm in MyApp, about to render the app.")} Client defined:`,
    Sentry.getCurrentHub().getClient() !== undefined
    // sentryServerConfig.num
  );
  // Sentry.captureException(new Error("in MyApp component"));
  // console.log(new Error("in MyApp component").stack);
  // console.log(Component);
  // console.log(
  //   "Sentry client defined:",
  //   Sentry.getCurrentHub().getClient() !== undefined
  // );
  // throw new Error("inside MyApp");
  // return (
  //   <Sentry.ErrorBoundary fallback={"An error has occurred"}>
  //     <Component {...pageProps} />
  //   </Sentry.ErrorBoundary>
  // );
  return <Component {...pageProps} />;
}

// console.log(
//   "I'm about to add beforeSend. Client defined:",
//   Sentry.getCurrentHub().getClient() !== undefined,
//   sentryServerConfig.num
// );
// console.log(
//   "Sentry client defined:",
//   Sentry.getCurrentHub().getClient() !== undefined,
//   sentryServerConfig.num
// );

// sentryBrowserConfig.beforeSend = (event, hint) => {
//   console.log("I'm in browser beforeSend!", sentryServerConfig.num);
//   console.log(event);
//   return event;
// };
// sentryServerConfig.beforeSend = (event, hint) => {
//   console.log("I'm in server beforeSend!");
//   console.log(event);
//   return event;
// };

// console.log("serverConfig after adding beforeSend", sentryServerConfig.num);
// console.log(sentryServerConfig);
// console.log("clientConfig after adding beforeSend", sentryBrowserConfig.num);
// console.log(sentryBrowserConfig);

// sentryBrowserConfig.integrations
//   .push
//   // nextjs tracing integration?
//   ();

// const x = nextRouter.default;
// // debugger;
// // const y = nextRouter.createRouter({});
// const routerPrototype = nextRouter.Router.prototype;
// const oldPush = routerPrototype.push;
// const newPush = function (...args) {
//   console.log("I'm in the new push!");
//   // debugger;
//   return oldPush.call(this, ...args);
// };
// routerPrototype.push = newPush;
// x.__sentry = true;

export default MyApp;

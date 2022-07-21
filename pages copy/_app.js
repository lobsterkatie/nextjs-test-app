import "../styles/globals.css";
// console.log("top top of _app.js");
// debugger;

import { AppProps } from "next/app";

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

const isServer = typeof window === "undefined";

function MyApp(contextData) {
  const { Component, pageProps, err, router } = contextData;
  console.log("in my app for", Component.name);
  // console.log("context:");
  console.log(contextData);
  // console.log(
  //   "asPath, basePath, pathname, route, isSSR:",
  //   router.asPath,
  //   // router.basePath,
  //   router.pathname,
  //   router.route,
  //   router.isSSR
  // );

  debugger;
  console.log(isServer ? "" : "components: " + Object.keys(router.components));
  console.log("\n");
  // if (pageProps.statusCode !== 404) {
  //   console.log("context in MyApp", contextData);
  // }
  // console.log("err in MyApp is", err && err.message);
  // console.log(
  //   `\n${piglatin("I'm in MyApp, about to render the app.")} Client defined:`,
  //   Sentry.getCurrentHub().getClient() !== undefined
  // );
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
  // console.log("pageProps", pageProps);
  // if (global.__sentry_transaction__) {
  //   const span = global.__sentry_transaction__.startChild({
  //     op: "beforeRender _app",
  //   });
  //   span.finish();
  // }

  const jsx = <Component {...pageProps} />;

  // if (global.__sentry_transaction__) {
  //   const span = global.__sentry_transaction__.startChild({
  //     op: "beforeReturn _app",
  //   });
  //   span.finish();
  // }

  return jsx;
}

// console.log(
//   "Sentry client defined:",
//   Sentry.getCurrentHub().getClient() !== undefined,
//   sentryServerConfig.num
// );

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

// export default MyApp;

function appWithSentry(appComponent) {
  console.log("I'm in the appWithSentry function");
  return function wrappedUnderscoreApp(context) {
    console.log(
      "I'm in the wrappedUnderscoreApp function returned by appWithSentry"
    );
    console.log(global.__sentry_transaction__);
    let _appWrapperSpan;
    if (global.__sentry_transaction__) {
      debugger;
      _appWrapperSpan = global.__sentry_transaction__.startChild({
        op: "_app wrapper",
      });
      console.log(
        `Changing transaction name from ${global.__sentry_transaction__} to ${context.router.route}`
      );
      global.__sentry_transaction__.setName(context.router.route, "route");
    }
    console.log(global.__sentry_transaction__);
    debugger;
    // const transaction = Sentry.getCurrentHub().startTransaction({
    //   name: context.router.route,
    // });

    // if (!context.resolvedUrl.endsWith(".map")) {
    //   const transaction = Sentry.getCurrentHub().startTransaction({
    //     name: context.router.route,
    //   });
    //   context.res.on("finish", () => {
    //     console.log("in res.finish");
    //     debugger;
    //     transaction.finish();
    //   });
    // }

    const jsx = appComponent(context);

    if (global.__sentry_transaction__) {
      _appWrapperSpan.finish();
      global.__sentry_transaction__.finish();
    }

    return jsx;
  };
}

// export default appWithSentry(MyApp);
export default Sentry.withSentry_app(MyApp);

// NOTE: DATA-FETCHING METHODS HERE WILL BE IGNORED! DON'T BOTHER WRITING THEM.

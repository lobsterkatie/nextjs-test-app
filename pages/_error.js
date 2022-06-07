import NextErrorComponent from "next/error";

import * as Sentry from "@sentry/nextjs";
// import * as SentryUtils from "@sentry/utils";
// import { Handlers } from "@sentry/node";
// const { parseRequest } = Handlers;

const MyError = (contextData) => {
  const { statusCode, err } = contextData;
  // if (statusCode !== 404) {
  //   console.log("In custom error component");
  //   console.log("contextData is", contextData);
  //   console.log("The error is", err);
  //   console.log("hasGetInitialPropsRun is", hasGetInitialPropsRun);
  //   debugger;
  // }
  // if (!hasGetInitialPropsRun && err) {
  //   debugger;
  //   // getInitialProps is not called in case of
  //   // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
  //   // err via _app.js so it can be captured
  //   console.log("capturing exception directly in _error component");
  //   Sentry.withScope((scope) => {
  //     scope.addEventProcessor((event) => {
  //       SentryUtils.addExceptionMechanism(event, {
  //         type: "instrument",
  //         handled: true,
  //         data: {
  //           function: "_error.customErrorComponent",
  //         },
  //       });
  //       return event;
  //     });
  //     Sentry.captureException(err);
  //   });
  //   // Flushing is not required in this case as it only happens on the client
  // }
  await Sentry.captureFromUnderscoreError(contextData);

  return (
    <div>
      <NextErrorComponent statusCode={statusCode} />
      <p>The error was: {err} </p>
    </div>
  );
};

MyError.getInitialProps = async (contextData) => {
  // console.log("in MyError.getInitialProps for url", req && req.url);
  console.log("in MyError.getInitialProps");
  console.log("contextData is");
  console.log(contextData);
  debugger;
  // const { res, err, req: _req } = contextData;
  const { res, err } = contextData;

  // if (req.url !== "_next/webpack-hmr" && res.statusCode !== 404) {
  //   debugger;
  // }

  const errorInitialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
  });

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  // errorInitialProps.hasGetInitialPropsRun = true;

  // we don't want to log these in Sentry, so at this point we're done
  // if (res && res.statusCode === 404) {
  //   return errorInitialProps;
  // }

  // console.log("context data in MyError.getInitialProps", contextData);

  // Running on the server, the response object (`res`) is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an exception was thrown somewhere in the React lifecycle (render,
  //    componentDidMount, etc) that was caught by Next.js's React Error
  //    Boundary. Read more about what types of exceptions are caught by Error
  //    Boundaries: https://reactjs.org/docs/error-boundaries.html

  //   Sentry.withScope((scope) => {
  //     scope.addEventProcessor((event) => {
  //       SentryUtils.addExceptionMechanism(event, {
  //         type: "instrument",
  //         handled: true,
  //         data: {
  //           function: "_error.getInitialProps",
  //         },
  //       });
  //       return event;
  //     });
  //     if (req) {
  //       scope.addEventProcessor((event) =>
  //         SentryUtils.addRequestDataToEvent(event, req)
  //       );
  //     }
  //
  //     if (err) {
  //       console.log("capturing exception in _error component's getInitialProps");
  //       Sentry.captureException(err);
  //     }
  //     // `getInitialProps` was called without any information about what the error
  //     // might be. This likely indicates the value thrown was falsy.
  //     else {
  //       console.log(
  //         "capturing exception in _error component's getInitialProps when not given an error"
  //       );
  //       Sentry.captureMessage(
  //         `_error.js getInitialProps called with falsy error (${err})`
  //       );
  //     }
  //   });
  //
  //   // Flushing before returning is necessary if deploying to Vercel, see
  //   // https://vercel.com/docs/platform/limits#streaming-responses
  //   await Sentry.flush(2000);

  await Sentry.captureFromUnderscoreError(contextData);

  return errorInitialProps;
};

export default MyError;

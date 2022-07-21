// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as Sentry from "@sentry/nextjs";
Error.stackTraceLimit = Infinity;

// async function stuff() {
//   const counter = { value: 2 };
//   // while (counter.value > 0) {
//   setTimeout(() => {
//     counter.value -= 1;
//     console.log("new counter value:", counter.value);
//   }, 1000);
//   // }
//   console.log("I'm in the stuff function");
//   return Promise.resolve();
// }

const handler = async (req, res, ...args) => {
  debugger;
  // setImmediate(stuff);
  // console.log(
  //   "\nI'm in the api route. Client defined:",
  //   Sentry.getCurrentHub().getClient() !== undefined
  // );
  // throw new Error("in /hello API route");
  // Sentry.captureException(new Error("in /hello API route"));
  // Sentry.captureException(new Error("in /hello API route 2"));
  // console.log("stack", new Error("").stack);
  await fetch("http://www.nyt.com");
  // await stuff();
  res.status(200).json({ name: "Maisey Dog" });
};

const __sentryHandler = Sentry.withSentry(handler);
// console.log(exports.default);
debugger;
// throw exports.default;
// exports.withSentry = exports.default;

exports.withSentry = async function (event, context, callback) {
  console.log("IN AWS HANDLER");
  console.log(event);
  console.log(context);
  console.log(callback);
  // return __sentryHandler()
  return {
    statusCode: 200,
    headers: {},
    body: "Hello world",
  };
};

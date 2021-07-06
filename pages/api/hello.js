// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as Sentry from "@sentry/nextjs";
Error.stackTraceLimit = Infinity;

async function stuff() {
  let counter = 2;
  while (counter > 0) {
    setTimeout(() => {
      counter -= 1;
      console.log("new counter value:", counter);
    }, 1000);
  }
  console.log("I'm in the stuff function");
}

const handler = async (req, res) => {
  // setImmediate(stuff);
  console.log(
    "\nI'm in the api route. Client defined:",
    Sentry.getCurrentHub().getClient() !== undefined
  );
  // throw new Error("in /hello API route");
  Sentry.captureException(new Error("in /hello API route"));
  // console.log("stack", new Error("").stack);
  await fetch("http://www.nyt.com");
  await stuff();
  res.status(200).json({ name: "Maisey Dog" });
};

export default Sentry.withSentry(handler);

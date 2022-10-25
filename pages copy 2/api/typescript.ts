import * as Sentry from "@sentry/nextjs";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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

export default Sentry.withSentry(handler);

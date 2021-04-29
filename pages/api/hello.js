// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as Sentry from "@sentry/nextjs";

const handler = (req, res) => {
  console.log(
    "\nI'm in the api route. Client defined:",
    Sentry.getCurrentHub().getClient() !== undefined
  );
  throw new Error("in API route");
  res.status(200).json({ name: "Maisey Dog" });
};

export default Sentry.withSentry(handler);

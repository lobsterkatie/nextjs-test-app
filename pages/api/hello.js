// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as Sentry from "@sentry/nextjs";

export default (req, res) => {
  console.log("this in orig handler:", this);
  console.log(
    "\nI'm in the api route. Client defined:",
    Sentry.getCurrentHub().getClient() !== undefined
    // sentryServerConfig.num
  );
  throw new Error("in API route");
  res.status(200).json({ name: "Maisey Dog" });
};

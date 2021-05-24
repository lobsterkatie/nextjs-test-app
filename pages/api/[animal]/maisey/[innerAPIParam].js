// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as Sentry from "@sentry/nextjs";

const handler = async (req, res) => {
  console.log(
    "\nI'm in the innerAPIParam route. Client defined:",
    Sentry.getCurrentHub().getClient() !== undefined
  );
  // throw new Error("in API route");
  await fetch("http://www.nyt.com");
  res.status(200).json({ name: "Maisey Dog" });
};

export default Sentry.withSentry(handler);

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as Sentry from "@sentry/nextjs";

const handler = async (req, res) => {
  console.log(
    `In API route: URL: ${req.url}  Transaction: ${
      __SENTRY__.hub.getScope()._span && __SENTRY__.hub.getScope()._span.name
    }`
  );
  // console.log(
  //   "\nI'm in the cats api route. Client defined:",
  //   Sentry.getCurrentHub().getClient() !== undefined
  // );
  // throw new Error("in API route");
  await fetch(`http://www.nyt.com?animal=${req.query.animal}`);
  res.status(200).json({ name: "Maisey Dog" });
};

export default Sentry.withSentry(handler);

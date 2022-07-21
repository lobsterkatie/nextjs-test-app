// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as Sentry from "@sentry/nextjs";

const handler = async (req, res, ...args) => {
  console.log(req);
  console.log(res);
  console.log(args);
  debugger;
  // console.log(
  //   `In API route: URL: ${req.url}  Transaction: ${
  //     __SENTRY__.hub.getScope()._span && __SENTRY__.hub.getScope()._span.name
  //   }`
  // );
  Sentry.configureScope((scope) => {
    scope.setTag("day", "Thursday");
    scope.setExtra("soExtra", { dogs: "yes", cats: "maybe" });
    scope.setContext("animals", {
      a: ["aardvark", "ape"],
      b: ["bear", "baboon", "boa costrictor"],
    });
  });
  // console.log(
  //   "\nI'm in the animal facts api route. Client defined:",
  //   Sentry.getCurrentHub().getClient() !== undefined
  // );
  // console.log(new Error("").stack);
  // throw new Error("in API route");
  await fetch(`http://www.nyt.com?animal=${req.query.animal}`);
  res.status(200).json({ name: "Maisey Dog" });
};

export default Sentry.withSentry(handler);

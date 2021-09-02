import * as Sentry from "@sentry/nextjs";

const handler = async (req, res) => {
  Sentry.configureScope((scope) => {
    scope.setTag("configureScope", "throwError");
  });
  await fetch("http://www.nyt.com");
  Sentry.withScope((scope) => {
    Sentry.setTag("withScope", "withScopeThrowError");
    throw new Error("thrown in /throwError API route");
    res.status(200).json({ name: "Maisey Dog" });
  });
};

export default Sentry.withSentry(handler);

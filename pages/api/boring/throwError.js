import * as Sentry from "@sentry/nextjs";

const handler = async (req, res) => {
  throw new Error("thrown in /throwError API route first thing");
  Sentry.configureScope((scope) => {
    scope.setTag("configureScope", "throwError");
  });
  throw new Error("thrown in /throwError API route before awaiting the fetch");
  await fetch("http://www.nyt.com");
  Sentry.withScope((scope) => {
    Sentry.setTag("withScope", "withScopeThrowError");
    throw new Error("thrown in /throwError API route after awaiting the fetch");
    res.status(200).json({ name: "Maisey Dog" });
  });
};

export default Sentry.withSentry(handler);

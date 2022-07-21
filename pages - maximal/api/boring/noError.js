import * as Sentry from "@sentry/nextjs";

const handler = async (req, res) => {
  Sentry.configureScope((scope) => {
    scope.setTag("configureScope", "no error");
  });
  debugger;
  await fetch("http://www.nyt.com");
  Sentry.withScope((scope) => {
    scope.setTag("withScope", "withScopeNoError");
    res.status(200).json({ name: "Maisey Dog" });
  });
};

export default Sentry.withSentry(handler);

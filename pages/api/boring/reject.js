import * as Sentry from "@sentry/nextjs";

const handler = async (req, res) => {
  await fetch("http://www.nyt.com");
  debugger;
  return Promise.reject(new Error("promise rejected in handler"));
  res.status(200).json({ name: "Maisey Dog" });
};

export default Sentry.withSentry(handler);

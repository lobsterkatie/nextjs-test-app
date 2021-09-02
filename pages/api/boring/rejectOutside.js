import * as Sentry from "@sentry/nextjs";

Promise.reject(new Error("promise rejected outside of handler"));

const handler = async (req, res) => {
  await fetch("http://www.nyt.com");
  res.status(200).json({ name: "Maisey Dog" });
};

export default Sentry.withSentry(handler);

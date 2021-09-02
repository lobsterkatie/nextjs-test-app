import * as Sentry from "@sentry/nextjs";

throw new Error("error thrown outside handler");

const handler = async (req, res) => {
  await fetch("http://www.nyt.com");
  res.status(200).json({ name: "Maisey Dog" });
};

export default Sentry.withSentry(handler);

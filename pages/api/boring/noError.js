import * as Sentry from "@sentry/nextjs";

const handler = async (req, res) => {
  // await fetch("http://www.nyt.com");
  res.status(200).json({ name: "Maisey Dog" });
};

export default Sentry.withSentry(handler);

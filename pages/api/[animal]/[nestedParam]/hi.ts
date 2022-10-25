// import * as Sentry from "@sentry/nextjs";

// export default async (req, res) => {
const handler = async (req, res) => {
  // Sentry.configureScope((scope) => {
  //   scope.setTag("configureScope", "no error");
  // });
  // // await fetch("http://www.nyt.com");
  // Sentry.withScope((scope) => {
  //   scope.setTag("withScope", "withScopeNoError");
  // });
  res.status(200).json({ name: "Maisey Dog" });
};

// export default Sentry.withSentry(handler);
export default handler;

export const cats = "maybe";

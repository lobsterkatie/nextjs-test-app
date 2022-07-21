import * as Sentry from "@sentry/nextjs";

let x = 0;

const work = () => {
  x += 1;
  if (x % 2 === 0) {
    throw new String("string thrown inside of the work function");
  } else {
    throw "string thrown inside of the work function";
  }
  throw new Error("thrown inside of the work function");
};

const handler = async (req, res) => {
  // work();
  const err = new Error("thrown in /throwError API route first thing");
  err.stack = err.stack.split("\n").slice(0, 3).join("\n");
  throw err;
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

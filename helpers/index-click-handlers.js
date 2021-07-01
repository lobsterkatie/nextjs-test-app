import * as nextRouter from "next/router";
import * as Sentry from "@sentry/nextjs";
import { otherScriptFunc } from "./other-script";

export const messageCallback = () => {
  Sentry.captureMessage("Testing testing 1 2 3");
};

export const errorCallback = () => {
  // throw new Error("koala");
  try {
    throw new Error("koala");
  } catch (err) {
    Sentry.captureException(err);
  }
};

export const promiseRejectionCallback = () => {
  Promise.reject(new Error("I'm an Error object"));
  // Promise.reject({"I'm": "a regular object"})
  // Promise.reject(["I'm", "an", "array"])
  // Promise.reject("I'm a string")

  // try {
  //   Promise.reject(new Error("I'm an Error object"))
  // } catch (err) {
  //   Sentry.captureException(err);
  // }
};

export const fetchCallback = async () => {
  console.log("in fetchCallback!");
  const transaction = Sentry.startTransaction({
    name: "/test/trace/continuation",
  });
  Sentry.getCurrentHub().getScope().setSpan(transaction);

  [
    // "aardvark",
    // "bear",
    // "canary",
    // "donkey",
    // "elephant",
    // "frog",
    // "giraffe",
    // "hippo",
    // "iguana",
    // "jaguar",
    // "kangaroo",
    // "lemur",
    // "manatee",
    // "narwhal",
    // "opossum",
    // "penguin",
    // "quail",
    // "rattlesnake",
    // "serval",
    // "tiger",
    // "unicorn",
    // "vulture",
    // "wallaby",
    // "xantus",
    // "yak",
    // "zebra",
  ].forEach((animal) => fetch(`/api/${animal}/facts?hi=hello`));
  const body = new FormData();
  body.set("exploding", "pizza");
  body.set("gold", "fish");
  await fetch(`/api/${"maisey"}/facts?hi=hello`, {
    method: "POST",
    // body: new Blob(["zebra", "koala"]),
    // body,
    body: JSON.stringify({ exploding: "pizza", gold: "fish" }),
    headers: { "Content-Type": "application/json" },
  });
  transaction.finish();
  // console.log("transaction trace ID:", transaction.traceId);
  // fetch("/api/hello");
  // const transaction = Sentry.startTransaction({ name: "fetch button click" });
  // Sentry.getCurrentHub().getScope()?.setSpan(transaction);
  // // fetch("/bunch-of-json.json")
  // //   .then((response) => response.json())
  // //   .then((data) => console.log(data));
  // await fetch("http://127.0.0.1:3000/api/hello/")
  //   .then((response) => response.json())
  //   .then((json) => console.log("JSON returned from server:", json))
  //   .catch((err) => Sentry.captureException(err));
  // console.log("after the fetch");
  // // .then((response) => response.json())
  // // .then((data) => console.log(data));
  // transaction.finish();
};

export const erroringTransactionCallback = () => {
  const transaction = Sentry.startTransaction({
    name: "meet new dog",
    op: "dog.new.meet",
  });
  Sentry.getCurrentHub().getScope().setSpan(transaction);
  const tailWag = transaction.startChild({ op: "wag.tail" });
  console.log("I'm wagging my tail");
  setTimeout(() => {
    console.log("I'm still wagging my tail");
    tailWag.finish();
  }, 1000);
  const buttSniff = transaction.startChild({ op: "butt.sniff" });
  setTimeout(() => {
    console.log("I'm sniffing your butt");
    try {
      throw new Error("Your butt is stinky");
    } finally {
      buttSniff.finish();
      const playBow = transaction.startChild({ op: "bow.play" });
      setTimeout(() => {
        console.log("Let's play!");
        playBow.finish();
      }, 400);
    }
  }, 250);
  setTimeout(() => {
    console.log("Nice to meet you!");
    transaction.finish();
  }, 1250);
};

export const linkToOtherPageCallback = () => {
  const router = nextRouter.useRouter();
  router.push("/level-one/other-page");
};

export function outerFunc(callback) {
  return innerFunc(callback);
  // try {
  //   innerFunc(callback);
  // } catch (err) {
  //   Sentry.captureException(err);
  // }
}

function innerFunc(callback) {
  innerInnerFunc(callback);
  // try {
  //   innerInnerFunc(callback);
  // } catch (err) {
  //   Sentry.captureException(err);
  // }
}

function innerInnerFunc(callback) {
  mostInnerFunc(callback);
  // try {
  //   mostInnerFunc(callback);
  // } catch (err) {
  //   Sentry.captureException(err);
  // }
}

function mostInnerFunc(callback) {
  otherScriptFunc(callback);
  // try {
  //   otherScriptFunc(callback);
  // } catch (err) {
  //   Sentry.captureException(err);
  // }
}

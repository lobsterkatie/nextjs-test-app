// console.log("top top of pages/other-page.js");

import * as nextRouter from "next/router";
import { LoadNewPageLink } from "../../components/loadnewpagelink";
import * as Sentry from "@sentry/nextjs";

export default function OtherPage(color) {
  // console.log("in otherPage function");
  const homeURL = "/";
  const router = nextRouter.useRouter();
  x = x + 1;

  // console.log(
  //   "\nI'm in the component function for OtherPage. Client defined:",
  //   Sentry.getCurrentHub().getClient() !== undefined
  // );
  // console.log("x = ", x);
  // if (x > 1) {
  //   console.log("about to throw error");
  //   const err = new Error("in component function for OtherPage");
  //   console.log(err.stack);
  //   throw err;
  // }
  return (
    <div>
      You're now on the other page. Click
      <LoadNewPageLink href={homeURL}>here</LoadNewPageLink>
      to go back to the home page.
    </div>
  );
}
let x = 0;

// only called on server, before rendering a static page
export async function getStaticProps() {
  // x = x + 1;
  // // grab data from somewhere

  // console.log(
  //   "\nI'm in getStaticProps for OtherPage. Client defined:",
  //   Sentry.getCurrentHub().getClient() !== undefined
  // );
  // console.log("x = ", x);
  // if (x > 1) {
  //   console.log("about to throw error");
  //   const err = new Error("in in getStaticProps for OtherPage");
  //   console.log(err.stack);
  //   throw err;
  // }
  // console.log(
  //   "Sentry client defined:",
  //   Sentry.getCurrentHub().getClient() !== undefined
  // );
  // Sentry.captureException(new Error("in getStaticProps for OtherPage"));

  // whatever is returned in props ends up as props on the page component (which in
  // our case means as arguments to the function, since this is a functional component)
  return {
    props: { color: "red" },
    revalidate: 1,
  };
}

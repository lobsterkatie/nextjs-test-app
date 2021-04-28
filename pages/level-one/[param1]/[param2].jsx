console.log("top top of pages/level-one/[param1]/[param2].js");

import * as nextRouter from "next/router";
import { LoadNewPageLink } from "../../../components/loadnewpagelink";
import * as Sentry from "@sentry/nextjs";

export default function LevelOneParam1Param2(color) {
  const homeURL = "/";
  const router = nextRouter.useRouter();
  console.log(
    "in LevelOneParam1Param2. Client defined:",
    Sentry.getCurrentHub().getClient() !== undefined
  );
  // throw new Error("Error from /level-one/[param1]/[param2]");
  return (
    <div>
      You're now on /level-one/[param1]/[param2]. Click
      <LoadNewPageLink href={homeURL}>here</LoadNewPageLink>
      to go back to the home page.
    </div>
  );
}

// // only called on server, before rendering a static page
// export async function getStaticProps() {
//   // grab data from somewhere

//   console.log(
//     "\nI'm in getStaticProps for OtherPage. Client defined:",
//     Sentry.getCurrentHub().getClient() !== undefined
//   );
//   // console.log(
//   //   "Sentry client defined:",
//   //   Sentry.getCurrentHub().getClient() !== undefined
//   // );
//   // Sentry.captureException(new Error("in getStaticProps for OtherPage"));

//   // whatever is returned in props ends up as props on the page component (which in
//   // our case means as arguments to the function, since this is a functional component)
//   return {
//     props: { color: "red" },
//     revalidate: 1,
//   };
// }

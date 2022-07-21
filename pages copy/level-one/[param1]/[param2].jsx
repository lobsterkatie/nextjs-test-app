// console.log("top top of pages/level-one/[param1]/[param2].js");

import * as nextRouter from "next/router";
import { LoadNewPageLink } from "../../../components/loadnewpagelink";
import * as Sentry from "@sentry/nextjs";

let k = 1;

export default function LevelOneParam1Param2() {
  const homeURL = "/";
  const router = nextRouter.useRouter();
  // console.log(
  //   "in LevelOneParam1Param2. Client defined:",
  //   Sentry.getCurrentHub().getClient() !== undefined
  // );
  k += 1;
  if (k > 2) {
    // will show up in front end, weirdly
    throw new Error("Error from /level-one/[param1]/[param2]");
  }
  return (
    <div>
      You're now on /level-one/[param1]/[param2]. Click
      <LoadNewPageLink href={homeURL}>here</LoadNewPageLink>
      to go back to the home page.
    </div>
  );
}

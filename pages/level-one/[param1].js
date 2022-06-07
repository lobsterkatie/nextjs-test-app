// console.log("top top of pages/level-one/[param1].js");

import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import { LoadNewPageLink } from "../../components/loadnewpagelink";
import * as Sentry from "@sentry/nextjs";

export default function Param1Page() {
  const homeURL = "/";
  const router = useRouter();
  // console.log("I'm in Param1Page");
  return (
    <div>
      This is the dynamic route `level-one/[param1]` Click
      <LoadNewPageLink href={homeURL}>here</LoadNewPageLink>
      to go back to the home page as a new page load.
      <br />
      Click <NextLink href={homeURL}>here</NextLink> to go back to the home page
      as a client-side navigation.
    </div>
  );
}

// only called on server, before rendering an SSR page
export async function getServerSideProps() {
  // grab data from somewhere
  debugger;
  console.log(
    "\nI'm in getServerSideProps for level-one/[param1]. Client defined:",
    Sentry.getCurrentHub().getClient() !== undefined
  );
  throw new Error("in /level-one/[param1] getServerSideProps");
  // console.log(
  //   "Sentry client defined:",
  //   Sentry.getCurrentHub().getClient() !== undefined
  // );
  // Sentry.captureException(new Error("in getServerSideProps for OtherPage"));

  // whatever is returned in props ends up as props on the page component (which in
  // our case means as arguments to the function, since this is a functional component)
  return {
    props: { color: "red" },
    revalidate: 1,
  };
}

// export async function getStaticPaths() {
//   return { paths: ["/level-one/rabbit"], fallback: false };
// }

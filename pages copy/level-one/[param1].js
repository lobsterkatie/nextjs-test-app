// console.log("top top of pages/level-one/[param1].js");

import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import { LoadNewPageLink } from "../../components/loadnewpagelink";
import * as Sentry from "@sentry/nextjs";
import { isBuild } from "../../helpers/isBuild";

// import * as routerModule from "next/router";
// import { default as routerDefault, createRouter } from "next/router";
// console.log(routerModule);
// console.log(routerDefault);
// if (!isBuild()) {
//   const { asPath } = routerDefault;
//   console.log(routerDefault.asPath);
//   console.log(routerDefault.asPath());
//   debugger;
// }
// debugger;

// const newRouter = createRouter()

export default function Param1Page(pageContext) {
  console.log("I'm in the Param1Page component");
  console.log(pageContext);
  debugger;
  const homeURL = "/";
  const router = useRouter();

  //   useEffect(() => {
  //     router.beforePopState(({ url, as, options }) => {
  //       console.log("I'm in `beforePopState");
  //       console.log({ url, as, options });
  //       debugger;
  //
  //       return true;
  //     });
  //   }, []);
  if (global.__sentry_transaction__) {
    const span = global.__sentry_transaction__.startChild({
      op: "beforeRender param1",
    });
    span.finish();
  }
  debugger;
  return (
    <div>
      This is the dynamic route `level-one/[param1]` Click
      <LoadNewPageLink href={homeURL}>here</LoadNewPageLink>
      to go back to the home page as a new page load.
      <br />
      Click <NextLink href={homeURL}>here</NextLink> to go back to the home page
      as a client-side navigation.
      <button>
        <a href="/">Go to homepage with a regular a-href link.</a>
      </button>
    </div>
  );
}

// only called on server, before rendering an SSR page
export async function getServerSideProps(context) {
  // async function _getServerSideProps(context) {
  // grab data from somewhere
  console.log(
    "\nI'm in getServerSideProps for level-one/[param1]. Client defined:",
    Sentry.getCurrentHub().getClient() !== undefined
  );
  // console.log(context);
  debugger;
  // throw new Error("in /level-one/[param1] getServerSideProps");
  // console.log(
  //   "Sentry client defined:",
  //   Sentry.getCurrentHub().getClient() !== undefined
  // );
  // Sentry.captureException(new Error("in getServerSideProps for OtherPage"));

  await fetch("http://www.nyt.com");

  // whatever is returned in props ends up as props on the page component (which in
  // our case means as arguments to the function, since this is a functional component)
  return {
    props: { color: "red" },
  };
}

// export async function getStaticPaths() {
//   return { paths: ["/level-one/rabbit"], fallback: false };
// }

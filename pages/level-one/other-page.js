// console.log("top top of pages/other-page.js");

import * as nextRouter from "next/router";
import { LoadNewPageLink } from "../../components/loadnewpagelink";
import * as Sentry from "@sentry/nextjs";

let x = 0;
let y = 0;

// export default function OtherPage(color) {
const defaultExport = function OtherPage(color = "blue") {
  // console.log("in otherPage function");
  const homeURL = "/";
  const router = nextRouter.useRouter();
  x = x + 1;

  // console.log(
  //   "\nI'm in the component function for OtherPage. Client defined:",
  //   Sentry.getCurrentHub().getClient() !== undefined
  // );
  // console.log("x = ", x);
  // if (x > 2) {
  //   console.log("about to throw error in component function");
  //   const err = new Error("in component function for OtherPage");
  //   // console.log(err.stack);
  //   throw err;
  // }
  return (
    <div>
      You're now on the other page. Click
      <LoadNewPageLink href={homeURL}>here</LoadNewPageLink>
      to go back to the home page.
    </div>
  );
};

// // only called on server, before rendering a static page
export async function getStaticProps() {
  x = x + 1;
  // // grab data from somewhere
  await fetch("http://www.nyt.com");

  console.log("x = ", x);
  // if (x > 2) {
  //   console.log("about to throw error");
  //   const err = new Error("in in getStaticProps for OtherPage");
  //   //   console.log(err.stack);
  //   debugger;
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
    props: { color: "red", propsFrom: "OtherPage.getStaticProps" },
    revalidate: 1,
  };
}

// export async function getServerSideProps(context) {
//   console.log("In other page getServerSideProps");
//   // y = y + 1;
//   // console.log("y = ", y);
//   // if (y > 1) {
//   //   console.log("about to throw error");
//   //   const err = new Error("in in getServerSideProps for OtherPage");
//   //   //   console.log(err.stack);
//   //   // debugger;
//   //   throw err;
//   // }
//
//   return {
//     // will be passed to the page component as props
//     props: { color: "red" },
//   };
// }

// defaultExport.getInitialProps = () => {
//   throw new Error("error thrown in other page's getInitialProps");
// };

export default defaultExport;

function makeWrapped(func) {
  console.log("I'm in makeWrapped!");
  return function wrappedFunc(...args) {
    console.log("In wrapped func");
    // debugger;
    return func(...args);
  };
}

// console.log("this", this);
// console.log("module", module);
// console.log("exports", exports);

// this.default = makeWrapped(this.default);

// export default makeWrapped(defaultExport);

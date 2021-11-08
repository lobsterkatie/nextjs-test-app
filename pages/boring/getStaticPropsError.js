import * as nextRouter from "next/router";
import * as Sentry from "@sentry/nextjs";

let x = 0;

export default function GetStaticPropsErrorPage(color) {
  return <div>Error in getStaticProps</div>;
}

// // only called on server, before rendering a static page
export async function getStaticProps() {
  console.log("in getStaticProps for GetStaticPropsErrorPage");
  x = x + 1;
  // // grab data from somewhere
  await fetch("http://www.nyt.com");

  console.log("x = ", x);
  if (x > 2) {
    console.log("about to throw error");
    const err = new Error("in getStaticProps for GetStaticPropsErrorPage");
    //   console.log(err.stack);
    debugger;
    throw err;
  }

  // whatever is returned in props ends up as props on the page component (which in
  // our case means as arguments to the function, since this is a functional component)
  return {
    props: { color: "red" },
    revalidate: 1,
  };
}

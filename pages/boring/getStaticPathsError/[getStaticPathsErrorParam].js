import * as nextRouter from "next/router";
import * as Sentry from "@sentry/nextjs";
import { isBuild } from "../../../helpers/isBuild";

// let x = 0;

export default function GetStaticPropsErrorPage({ color } = { color: "blue" }) {
  return <div>Error in getStaticProps. The color is {color}.</div>;
}

// only called on server, during build or getStaticProps revalidation, so it knows which pages to pre-render
export async function getStaticPaths() {
  console.log("in getStaticPaths for GetStaticPathsErrorPage");
  // x = x + 1;
  // // grab data from somewhere
  // await fetch("http://www.nyt.com");

  console.log(process.argv.toString());

  // console.log("x = ", x);
  if (!isBuild()) {
    console.log("about to throw error");
    const err = new Error("in getStaticPaths for GetStaticPathsErrorPage");
    //   console.log(err.stack);
    debugger;
    throw err;
  }

  // whatever is returned in props tells it which paths to pre-render
  return {
    paths: [{ params: { getStaticPathsErrorParam: "cats" } }],
    fallback: "blocking",
  };
}

// only called on server, before rendering a static page
export async function getStaticProps() {
  console.log("in getStaticProps for GetStaticPathsErrorPage");

  // whatever is returned in props ends up as props on the page component (which in
  // our case means as arguments to the function, since this is a functional component)
  return {
    props: {
      color: "red",
      propsFrom: "GetStaticPathsErrorPage.getStaticProps",
    },
    revalidate: 1,
  };
}

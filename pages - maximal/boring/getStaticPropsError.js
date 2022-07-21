import * as nextRouter from "next/router";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { isBuild } from "../../helpers/isBuild";

// let x = 0;

export default function GetStaticPropsErrorPage({ color } = { color: "blue" }) {
  return (
    <div>
      Error in getStaticProps. The color is {color}.
      <button>
        <Link href="/">
          <a>Use a Link to go to home.</a>
        </Link>
      </button>
    </div>
  );
}

// // only called on server, before rendering a static page
export async function getStaticProps() {
  console.log("in getStaticProps for GetStaticPropsErrorPage");
  console.log("isBuild in GetStaticPropsErrorPage:", isBuild());
  // x = x + 1;
  // // grab data from somewhere
  // await fetch("http://www.nyt.com");

  // console.log("x = ", x);
  if (!isBuild()) {
    console.log("about to throw error");
    const err = new Error("in getStaticProps for GetStaticPropsErrorPage");
    //   console.log(err.stack);
    throw err;
  }

  // whatever is returned in props ends up as props on the page component (which in
  // our case means as arguments to the function, since this is a functional component)
  return {
    props: {
      color: "red",
      propsFrom: "GetStaticPropsErrorPage.getStaticProps",
    },
    revalidate: 1,
  };
}

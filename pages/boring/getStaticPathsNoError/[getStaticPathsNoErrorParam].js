import * as nextRouter from "next/router";
import * as Sentry from "@sentry/nextjs";

let x = 0;

export default function GetStaticPathsNoErrorPage(
  { color } = { color: "blue" }
) {
  return (
    <div>
      <p>GetStaticPathsNoErrorPage</p>
      <p>The color is {color}.</p>
      <p>
        Go <a href="/">home</a>
      </p>
    </div>
  );
}

// only called on server, during build, so it knows which pages to pre-render
export async function getStaticPaths() {
  console.log("in getStaticPaths for GetStaticPathsNoErrorPage");

  // whatever is returned in props tells it which paths to pre-render
  return {
    paths: [{ params: { getStaticPathsNoErrorParam: "dogs" } }],
    fallback: "blocking",
  };
}

// only called on server, before rendering a static page
export async function getStaticProps() {
  console.log("in getStaticProps for GetStaticPathsNoErrorPage");

  // whatever is returned in props ends up as props on the page component (which in
  // our case means as arguments to the function, since this is a functional component)
  return {
    props: {
      color: "red",
      propsFrom: "GetStaticPathsNoErrorPage.getStaticProps",
    },
    revalidate: 1,
  };
}

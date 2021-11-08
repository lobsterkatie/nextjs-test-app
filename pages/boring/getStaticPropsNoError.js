import * as nextRouter from "next/router";
import * as Sentry from "@sentry/nextjs";

let x = 0;

export default function GetStaticPropsNoErrorPage(color = "blue") {
  return (
    <div>
      <p>GetStaticPropsNoErrorPage</p>
      <p>
        Go <a href="/">home</a>
      </p>
    </div>
  );
}

// only called on server, before rendering a static page
export async function getStaticProps() {
  console.log("in getStaticProps for GetStaticPropsNoErrorPage");

  // whatever is returned in props ends up as props on the page component (which in
  // our case means as arguments to the function, since this is a functional component)
  return {
    props: { color: "red" },
    revalidate: 1,
  };
}

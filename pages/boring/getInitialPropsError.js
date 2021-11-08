import * as Sentry from "@sentry/nextjs";

let y = 0;

export default function GetInitialPropsErrorPage(color = "blue") {
  return <div>Error in GetIntialPropsErrorPage</div>;
}

export async function getInitialProps() {
  console.log("In GetInitialPropErrorPage's getInitialProps");

  y = y + 1;
  console.log("y = ", y);
  if (y > 1) {
    console.log("about to throw error");
    const err = new Error(
      "error thrown in GetInitialPropsError's getInitialProps"
    );
    //   console.log(err.stack);
    // debugger;
    throw err;
  }
}

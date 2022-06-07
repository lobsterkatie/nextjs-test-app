import * as Sentry from "@sentry/nextjs";

let y = 3;

export default function GetInitialPropsErrorPage(
  { color } = { color: "blue" }
) {
  return <div>Error in GetIntialPropsErrorPage. The color is {color}.</div>;
}

GetInitialPropsErrorPage.getInitialProps = async (ctx) => {
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

  return {
    color: "red",
  };
};

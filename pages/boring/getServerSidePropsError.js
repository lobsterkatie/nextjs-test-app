import * as Sentry from "@sentry/nextjs";

let y = 0;

export default function GetServerSidePropsError(color = "blue") {
  return <div>Error in getServerSideProps</div>;
}

export async function getServerSideProps(context) {
  console.log("In GetServerSidePropsError's getServerSideProps");
  y = y + 1;
  console.log("y = ", y);
  if (y > 1) {
    console.log("about to throw error");
    const err = new Error("in getServerSideProps for GetServerSidePropsError");
    //   console.log(err.stack);
    // debugger;
    throw err;
  }

  return {
    // will be passed to the page component as props
    props: { color: "red" },
  };
}

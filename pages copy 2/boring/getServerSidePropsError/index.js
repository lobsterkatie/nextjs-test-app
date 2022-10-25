import * as Sentry from "@sentry/nextjs";

export default function GetServerSidePropsError({ color } = { color: "blue" }) {
  return <div>Error in getServerSideProps. The color is {color}.</div>;
}

export async function getServerSideProps(context) {
  console.log("In GetServerSidePropsError's getServerSideProps");
  console.log("about to throw error");
  const err = new Error("in getServerSideProps for GetServerSidePropsError");
  //   console.log(err.stack);
  // debugger;
  throw err;

  return {
    // will be passed to the page component as props
    props: { color: "red" },
  };
}

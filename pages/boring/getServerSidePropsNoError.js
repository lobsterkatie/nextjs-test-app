import * as Sentry from "@sentry/nextjs";

let y = 0;

export default function GetServerSidePropsNoError(color = "blue") {
  return (
    <div>
      <p>GetServerSidePropsNoError</p>
      <p>
        Go <a href="/">home</a>
      </p>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log("In GetServerSidePropsNoError's getServerSideProps");

  return {
    // will be passed to the page component as props
    props: { color: "red" },
  };
}

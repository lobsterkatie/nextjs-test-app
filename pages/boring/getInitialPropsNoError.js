import * as Sentry from "@sentry/nextjs";

export default function GetInitialPropsNoErrorPage(color = "blue") {
  return (
    <div>
      <p>GetInitialPropsNoError</p>
      <p>
        Go <a href="/">home</a>
      </p>
    </div>
  );
}

export async function getInitialProps() {
  console.log("In GetInitialPropsNoErrorPage's getInitialProps");

  return {
    // will be passed to the page component as props
    props: { color: "red" },
  };
}

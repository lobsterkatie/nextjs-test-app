import * as Sentry from "@sentry/nextjs";

export default function GetInitialPropsNoErrorPage({ color }) {
  debugger;
  console.log("color is", color);
  return (
    <div>
      <p>GetInitialPropsNoError</p>
      <p>The color is {color}.</p>
      <p>
        Go <a href="/">home</a>
      </p>
    </div>
  );
}

GetInitialPropsNoErrorPage.getInitialProps = async (ctx) => {
  console.log("In GetInitialPropsNoErrorPage's getInitialProps");
  debugger;

  return {
    // will be passed to the page component as props
    color: "red",
  };
};

import NextErrorComponent from "next/error";

import * as Sentry from "@sentry/nextjs";
// import * as dataFetchers from "../helpers/dataFetchers.js";
const otherScript = require("../helpers/other-script.js");

// console.log(Object.getOwnPropertyDescriptors(otherScript));
// console.log(Object.getOwnPropertyDescriptors(Sentry));
// console.log(otherScript.cat);
// console.log(otherScript.newThing);

const CustomErrorComponent = (props) => {
  // people might still have this
  // Sentry.captureUnderscoreErrorException(props);

  return <NextErrorComponent statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async (contextData) => {
  console.log("In CustomErrorComponent.getInitialProps");
  debugger;
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;

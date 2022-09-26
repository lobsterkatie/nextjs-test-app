import NextErrorComponent from "next/error";

import * as Sentry from "@sentry/nextjs";

import type { NextPage, NextPageContext } from "next";
import type { ErrorProps } from "next/error";

import * as isBuild from "../helpers/isBuild";
const dataFetchers = require("../helpers/dataFetchers");

// dataFetchers.default = "new default";
export * from "../helpers/dataFetchers";
// export default dataFetchers.default;

// debugger;

type GetInitialPropsResult = ErrorProps & { stuff?: string };

const CustomErrorComponent: NextPage<GetInitialPropsResult> = (
  props: GetInitialPropsResult
) => {
  // this.getInitialProps = ....

  debugger;
  // people might still have this
  Sentry.captureUnderscoreErrorException(props); // I would expect this to error in TS

  console.log(props.stuff);

  return <NextErrorComponent statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async (
  contextData: NextPageContext
): Promise<GetInitialPropsResult> => {
  debugger;
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);
  // await Sentry.captureUnderscoreErrorException({ ...contextData });

  // This will contain the status code of the response
  const result = NextErrorComponent.getInitialProps(
    contextData
  ) as GetInitialPropsResult;
  result.stuff = "things";
  return result;
  // return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;

// const scope = Sentry.getCurrentHub().getScope();
// interface NoIndexSignature {
//   a: string;
//   b: number;
// }
// const x: NoIndexSignature = { a: "hi", b: 3 };
// scope.setContext("hi", x);
//
// type Another = NoIndexSignature;

// export * from "../helpers/dataFetchers";

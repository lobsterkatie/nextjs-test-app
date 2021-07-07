console.log("top top of pages/index.js");

import Head from "next/head";
import * as nextRouter from "next/router";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import * as Sentry from "@sentry/nextjs";
import * as SentryTracing from "@sentry/tracing";

import {
  outerFunc,
  messageCallback,
  errorCallback,
  promiseRejectionCallback,
  fetchCallback,
  erroringTransactionCallback,
  linkToOtherPageCallback,
} from "../helpers/index-click-handlers";
import { LoadNewPageLink } from "../components/loadnewpagelink";

Error.stackTraceLimit = Infinity;

// Sentry.captureMessage("hi");
console.log(
  "in index.js Client defined:",
  Sentry.getCurrentHub().getClient() !== undefined
);
// console.log(new Error("index page error").stack);

export default function Home() {
  // console.log("in the Home render function");
  return (
    <div className={styles.container}>
      <Head>
        <title>Testing next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button id="message-button" onClick={() => outerFunc(messageCallback)}>
          Click me for a message
        </button>
        <button id="error-button" onClick={() => outerFunc(errorCallback)}>
          Click me for a js error
        </button>
        <button
          id="rejection-button"
          onClick={() => outerFunc(promiseRejectionCallback)}
        >
          Click me for an unhandled promise rejection
        </button>
        <button
          id="fetch-button"
          onClick={() => {
            // console.log("clicked the fetch button");
            return outerFunc(fetchCallback);
          }}
        >
          Click me to make a fetch request transaction
        </button>
        <button
          id="erroring-transaction-button"
          onClick={() => outerFunc(erroringTransactionCallback)}
        >
          Click me to make a an erroring transaction
        </button>

        <button id="alert-button" onClick={() => alert("hello!")}>
          Click me to show an alert
        </button>

        <button
          id="throw-API-error-button"
          onClick={() => fetch("/api/boring/throwError")}
        >
          Click me to throw an error in an API route
        </button>

        <button
          id="link-to-other-page"
          // onClick={() => outerFunc(linkToOtherPageCallback)}
        >
          Click
          <LoadNewPageLink href={"/level-one/other-page"}>here</LoadNewPageLink>
          to link to another page using an LoadNewPageLink.
        </button>
        <button
          id="link-to-other-page-with-link-component"
          // onClick={() => outerFunc(linkToOtherPageCallback)}
        >
          <Link href="/level-one/other-page">
            <a>I'm a next-provided Link to the other page.</a>
          </Link>
        </button>
        <button id="client-bundle">
          <Link href="/client.html">
            <a>See the client bundle analysis.</a>
          </Link>
        </button>
        <button id="server-bundle">
          <Link href="/server.html">
            <a>See the server bundle analysis.</a>
          </Link>
        </button>
        <br />
        <br />
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" dogs!! "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

// only called on server, before rendering a static page
export async function getStaticProps() {
  // grab data from somewhere

  console.log(
    "\nI'm in getStaticProps for the home page. Client defined:",
    Sentry.getCurrentHub().getClient() !== undefined
  );
  // if (Sentry.getCurrentHub().getClient() !== undefined) {
  //   console.log(
  //     "__SENTRY__.hub.getClient()",
  //     __SENTRY__.hub.getClient()._options.num
  //   );
  //   Sentry.captureException(
  //     new Error(
  //       `in getStaticProps for homepage ${
  //         __SENTRY__.hub.getClient()._options.num
  //       }`
  //     )
  //   );
  // }

  // console.log(
  //   "Sentry client defined:",
  //   Sentry.getCurrentHub().getClient() !== undefined
  // );

  // whatever is returned in props ends up as props on the page component (which in
  // our case means as arguments to the function, since this is a functional component)
  return {
    props: { color: "red" },
    revalidate: 1,
  };
}

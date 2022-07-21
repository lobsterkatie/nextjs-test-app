// console.log("top top of pages/index.js");

import Head from "next/head";
import styles from "../styles/Home.module.css";

Error.stackTraceLimit = Infinity;

export default function Home(context) {
  console.log("in the Home render function");
  console.log(context);
  debugger;
  return (
    <div className={styles.container}>
      <Head>
        <title>Testing next.js</title>
      </Head>
      <p>I'm the home page</p>
    </div>
  );
}

// // only called on server, before rendering a static page
// // async function _getStaticProps(context) {
// export async function getServerSideProps(context) {
export const getServerSideProps = async function (context) {
  // grab data from somewhere

  console.log("\nI'm in getServerSideProps for the home page.");
  console.log(context);
  debugger;

  // whatever is returned in props ends up as props on the page component (which in
  // our case means as arguments to the function, since this is a functional component)
  return {
    props: { color: "blue", propsFrom: "Home.getServerSideProps" },
    // revalidate: 1,
  };
};

export function doSomeStuff() {
  console.log("stuff");
}

function doStuff(things) {
  console.log(things);
}

function doOtherStuff(things) {
  console.log(things);
}

console.log(doOtherStuff.name);

const things = { stuff: doOtherStuff };

const doMoreStuff = doOtherStuff;
const doMoreDifferentStuff = () => {
  return doMoreStuff;
};

let yetMoreStuff;
yetMoreStuff = "hi";

export { doStuff };
export { doMoreDifferentStuff as doOtherstuff };

export const dogs = async function (cats) {
  return cats;
};

export const hi = (hello) => hello;

//
// // export const getStaticProps = Sentry.withSentryGSP(_getStaticProps);

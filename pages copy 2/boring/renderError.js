// import getConfig from "next/config";
import { isBuild } from "../../helpers/isBuild";

//
// const { publicRuntimeConfig } = getConfig();

// console.log("in pages/simple.js");
// console.log("runtime config");
// console.log(publicRuntimeConfig);
// debugger;

export default function RenderErrorPage({ color } = { color: "blue" }) {
  // console.log(`in render function in RenderErrorPage. The color is ${color}`);
  if (!isBuild()) {
    // console.log("about to throw error");
    // throw false;
    throw new Error("renderError thrown in RenderErrorPage's render function");
  }
  return <div>This is a very simple page.</div>;
}

export async function getStaticProps() {
  return {
    props: {
      color: "red",
      propsFrom: "RenderErrorPage.getStaticProps",
    },
    revalidate: 1,
  };
}

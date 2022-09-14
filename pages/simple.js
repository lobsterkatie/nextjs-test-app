import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

// console.log("in pages/simple.js");
// console.log("runtime config");
// console.log(publicRuntimeConfig);
// debugger;

export default function SimplePage() {
  return <div>This is a very simple page.</div>;
}

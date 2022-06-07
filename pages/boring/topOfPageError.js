console.log("top of topOfPageError");

debugger;

// so this only runs in the browser, not during build
if (typeof window !== "undefined") {
  console.log("about to throw error");
  throw new Error("topOfPageError thrown at outer level");
}

export default function SimplePage() {
  return <div>This is a very simple page.</div>;
}

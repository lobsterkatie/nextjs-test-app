import Error from "next/error";

export default function NotFound() {
  console.log("in 404 page");
  // Opinionated: do not record an exception in Sentry for 404
  return <Error statusCode={404} />;
}

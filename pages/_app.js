import App from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Next 12 example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>router.asPath: {router.asPath}</p>
      <Component {...pageProps} />
    </>
  );
};

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  console.log("Called _app.tsx getInitialProps", {
    parameterizedRoute: appContext.ctx.pathname,
  });

  return { ...appProps };
};

export default MyApp;

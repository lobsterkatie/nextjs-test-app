import * as wrapee from '/Users/Katie/Documents/Sentry/test-apps/next-js-test/styles/Home.module.css';
export * from '/Users/Katie/Documents/Sentry/test-apps/next-js-test/styles/Home.module.css';
import * as Sentry from '@sentry/nextjs';

/**
 * This file is a template for the code which will be substituted when our webpack loader handles non-API files in the
 * `pages/` directory.
 *
 * We use `/Users/Katie/Documents/Sentry/test-apps/next-js-test/styles/Home.module.css` as a placeholder for the path to the file being wrapped. Because it's not a real package,
 * this causes both TS and ESLint to complain, hence the pragma comments below.
 */

const userPageModule = wrapee ;

const pageComponent = userPageModule.default;

const origGetInitialProps = pageComponent.getInitialProps;
const origGetStaticProps = userPageModule.getStaticProps;
const origGetServerSideProps = userPageModule.getServerSideProps;

const getInitialPropsWrappers = {
  '/_app': Sentry.withSentryServerSideAppGetInitialProps,
  '/_document': Sentry.withSentryServerSideDocumentGetInitialProps,
  '/_error': Sentry.withSentryServerSideErrorGetInitialProps,
};

const getInitialPropsWrapper = getInitialPropsWrappers['/../styles/Home.module.css'] || Sentry.withSentryServerSideGetInitialProps;

if (typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? Sentry.withSentryGetStaticProps(origGetStaticProps, '/../styles/Home.module.css')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? Sentry.withSentryGetServerSideProps(origGetServerSideProps, '/../styles/Home.module.css')
    : undefined;

export { pageComponent as default, getServerSideProps, getStaticProps };

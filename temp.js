export * from '/Users/Katie/Documents/Sentry/test-apps/next-js-test/pages/level-one/optionalCatchall/[[...optionalPathParts]].js';

// @ts-ignore testing

var SentryServerSideSDK = require('@sentry/nextjs');
var userPageModule = require('/Users/Katie/Documents/Sentry/test-apps/next-js-test/pages/level-one/optionalCatchall/[[...optionalPathParts]].js');

var pageComponent = userPageModule.default;

var origGetInitialProps = pageComponent.getInitialProps;
var origGetStaticProps = userPageModule.getStaticProps;
var origGetServerSideProps = userPageModule.getServerSideProps;

if (typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = SentryServerSideSDK.withSentryGetInitialProps(origGetInitialProps, '');
}
if (typeof origGetStaticProps === 'function') {
  userPageModule.getInitialProps = SentryServerSideSDK.withSentryGetStaticProps(origGetStaticProps, '');
}
if (typeof origGetServerSideProps === 'function') {
  userPageModule.getServerSideProps = SentryServerSideSDK.withSentryGetServerSideProps(origGetServerSideProps, '');
}
// export { ...userPageModule};

// import * as userPageModule from '/Users/Katie/Documents/Sentry/test-apps/next-js-test/pages/level-one/optionalCatchall/[[...optionalPathParts]].js';
// import * as SentryServerSideSDK from '@sentry/nextjs';

export { pageComponent as default };

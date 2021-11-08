// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require("@next/bundle-analyzer")();
const path = require("path");

// console.log("in next.config.js");

const moduleExports = {
  // in next 10, to force webpack 5
  // future: {
  //   webpack5: true,
  // },

  // in next 11, to force webpack 4
  // webpack5: false,

  publicRuntimeConfig: { dogs: "yes", cats: "maybe" },
  // target: "experimental-serverless-trace",
  // target: "serverless",

  // distDir: "build",

  webpack: (config, buildContext) => {
    if (buildContext.isServer) {
      config.resolve = { ...config.resolve };
      config.resolve.alias = {
        ...config.resolve.alias,
        // "@sentry/cli": false,
      };
    }
    return config;
  },
};

moduleExportsFunction = (phase, config) => ({ ...config, ...moduleExports });

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.

  org: "testorg-az",
  url: "https://sentry.io/",
  project: "kmclb-js",

  dryRun: true,
  silent: true,
  // dryRun: false,
  // silent: false,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
// module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);

module.exports = withSentryConfig(
  moduleExportsFunction,
  SentryWebpackPluginOptions
);

// module.exports = withBundleAnalyzer(
//   withSentryConfig(moduleExports, SentryWebpackPluginOptions)
// );

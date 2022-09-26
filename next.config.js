// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// const { withSentryConfig } = require("@sentry/nextjs/build/cjs/config");
const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require("@next/bundle-analyzer")();
const withNodeModuleTranspilation = require("next-transpile-modules")(
  ["@sentry/nextjs"],
  { resolveSymlinks: false }
);
const path = require("path");
const webpack = require("webpack");

const moduleExports = {
  // in next 10, to force webpack 5
  // future: {
  //   webpack5: true,
  // },

  // in next 11, to force webpack 4
  // webpack5: false,

  // experimental: {
  //   outputStandalone: true,
  // },

  // output: "standalone",

  staticPageGenerationTimeout: 10000,

  reactStrictMode: true,
  swcMinify: true,

  publicRuntimeConfig: { dogs: "yes", cats: "maybe" },
  // target: "experimental-serverless-trace",
  // target: "serverless",

  // distDir: "build",

  webpack: (config, buildContext) => {
    // console.log(buildContext);
    if (buildContext.isServer) {
      config.resolve = { ...config.resolve };
      config.resolve.alias = {
        ...config.resolve.alias,
        // "@sentry/cli": false,
        // "@sentry/utils/esm/buildPolyfills":
        //   "@sentry/utils/build/esm/buildPolyfills/build",
      };
    }

    // config.plugins.push(
    //   new webpack.DefinePlugin({
    //     __SENTRY_DEBUG__: false,
    //     __SENTRY_TRACING__: false,
    //   })
    // );

    return config;
  },
  sentry: {
    configDir: "sentryConfig",
    // transpileClientSDK: true,
    hideSourceMaps: false,
    experiments: { autoWrapDataFetchers: true },
    // disableServerWebpackPlugin: true,
    // disableClientWebpackPlugin: true,
  },
};

// const moduleExportsFunction = (phase, config) => ({
//   ...config.defaults.defaultConfig,
//   ...moduleExports,
// });
const moduleExportsFunction = (phase, config) => {
  return {
    // ...config.defaultConfig,
    ...moduleExports,
  };
};

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

// module.exports = withNodeModuleTranspilation(
//   withSentryConfig(moduleExports, SentryWebpackPluginOptions)
// );

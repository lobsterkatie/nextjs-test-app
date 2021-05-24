// // This file sets a custom webpack configuration to use your Next.js app
// // with Sentry.
// // https://nextjs.org/docs/api-reference/next.config.js/introduction
// // https://docs.sentry.io/platforms/javascript/guides/nextjs/

// const { withSentryConfig } = require("@sentry/nextjs");

// const moduleExports = {
//   // your existing module.exports
// };

// const SentryWebpackPluginOptions = {
//   // Additional config options for the Sentry Webpack plugin. Keep in mind that
//   // the following options are set automatically, and overriding them is not
//   // recommended:
//   //   release, url, org, project, authToken, configFile, stripPrefix,
//   //   urlPrefix, include, ignore
//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options.
//   dryRun: true,
// };

// // Make sure adding Sentry options is the last code to run before exporting, to
// // ensure that your source maps include changes from all other Webpack plugins
// module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);

const { withSentryConfig } = require("@sentry/nextjs");
const path = require("path");

const moduleExports = {
  future: {
    useWebpack5: true,
  },
  i18n: {
    locales: ["en", "sk"],
    defaultLocale: "sk",
  },
  typescript: {
    ignoreDevErrors: true,
  },
  webpack(config, options) {
    // config.module.rules.push({
    //   test: /schema\.graphql$/,
    //   exclude: /node_modules/,
    //   use: ["graphql-tag/loader"],
    // });

    // config.module.rules.push({
    //   test: /\.graphqls?$/,
    //   exclude: [/node_modules/, /schema\.graphql$/],
    //   use: [
    //     options.defaultLoaders.babel,
    //     require.resolve("./webpack/rename-loader.js"),
    //   ],
    // });

    config.module.rules.push({
      test: /\.mjml$/,
      exclude: /node_modules/,
      use: ["raw-loader"],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: "json",
      use: "yaml-loader",
    });

    if (options.isServer) {
      config.resolve.alias["jose/jwt/verify"] = path.resolve(
        __dirname,
        "./node_modules/jose/dist/node/esm/jwt/verify.js"
      );
      config.resolve.alias["jose/jwt/sign"] = path.resolve(
        __dirname,
        "./node_modules/jose/dist/node/esm/jwt/sign.js"
      );
      config.resolve.alias["jose/jwk/parse"] = path.resolve(
        __dirname,
        "./node_modules/jose/dist/node/esm/jwk/parse.js"
      );
    } else {
      config.resolve.alias["jose/jwt/verify"] = path.resolve(
        __dirname,
        "./node_modules/jose/dist/browser/jwt/verify.js"
      );
      config.resolve.alias["jose/jwt/sign"] = path.resolve(
        __dirname,
        "./node_modules/jose/dist/browser/jwt/sign.js"
      );
      config.resolve.alias["jose/jwk/parse"] = path.resolve(
        __dirname,
        "./node_modules/jose/dist/browser/jwk/parse.js"
      );
    }

    return config;
  },
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);

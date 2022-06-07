const buildContext = {
  dir: "/Users/Katie/Documents/Sentry/test-apps/next-js-test",
  dev: false,
  isServer: false,
  buildId: "x_3ca7LVdnECEPOv6lIHl",
  config: {
    env: [],
    webpack: function (incomingConfig, buildContext) {
      var _a, _b;
      var newConfig = tslib_1.__assign({}, incomingConfig);
      // if user has custom webpack config (which always takes the form of a function), run it so we have actual values to
      // work with
      if (
        "webpack" in userNextConfig &&
        typeof userNextConfig.webpack === "function"
      ) {
        newConfig = userNextConfig.webpack(newConfig, buildContext);
      }
      // Tell webpack to inject user config files (containing the two `Sentry.init()` calls) into the appropriate output
      // bundles. Store a separate reference to the original `entry` value to avoid an infinite loop. (If we don't do
      // this, we'll have a statement of the form `x.y = () => f(x.y)`, where one of the things `f` does is call `x.y`.
      // Since we're setting `x.y` to be a callback (which, by definition, won't run until some time later), by the time
      // the function runs (causing `f` to run, causing `x.y` to run), `x.y` will point to the callback itself, rather
      // than its original value. So calling it will call the callback which will call `f` which will call `x.y` which
      // will call the callback which will call `f` which will call `x.y`... and on and on. Theoretically this could also
      // be fixed by using `bind`, but this is way simpler.)
      var origEntryProperty = newConfig.entry;
      newConfig.entry = function () {
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
          return tslib_1.__generator(this, function (_a) {
            return [
              2 /*return*/,
              addSentryToEntryProperty(origEntryProperty, buildContext),
            ];
          });
        });
      };
      // Enable the Sentry plugin (which uploads source maps to Sentry when not in dev) by default
      var enableWebpackPlugin = buildContext.isServer
        ? !((_a = userNextConfig.sentry) === null || _a === void 0
            ? void 0
            : _a.disableServerWebpackPlugin)
        : !((_b = userNextConfig.sentry) === null || _b === void 0
            ? void 0
            : _b.disableClientWebpackPlugin);
      if (enableWebpackPlugin) {
        // TODO Handle possibility that user is using `SourceMapDevToolPlugin` (see
        // https://webpack.js.org/plugins/source-map-dev-tool-plugin/)
        // TODO Give user option to use `hidden-source-map` ?
        // Next doesn't let you change this is dev even if you want to - see
        // https://github.com/vercel/next.js/blob/master/errors/improper-devtool.md
        if (!buildContext.dev) {
          newConfig.devtool = "source-map";
        }
        checkWebpackPluginOverrides(userSentryWebpackPluginOptions);
        newConfig.plugins = newConfig.plugins || [];
        newConfig.plugins.push(
          // @ts-ignore Our types for the plugin are messed up somehow - TS wants this to be `SentryWebpackPlugin.default`,
          // but that's not actually a thing
          new SentryWebpackPlugin(
            tslib_1.__assign(
              tslib_1.__assign(
                {
                  dryRun: buildContext.dev,
                  release: node_1.getSentryRelease(buildContext.buildId),
                },
                defaultSentryWebpackPluginOptions
              ),
              userSentryWebpackPluginOptions
            )
          )
        );
      }
      return newConfig;
    },
    webpackDevMiddleware: null,
    distDir: ".next",
    cleanDistDir: true,
    assetPrefix: "",
    configOrigin: "next.config.js",
    useFileSystemPublicRoutes: true,
    generateBuildId: () => null,
    generateEtags: true,
    pageExtensions: ["tsx", "ts", "jsx", "js"],
    target: "experimental-serverless-trace",
    poweredByHeader: true,
    compress: true,
    analyticsId: "",
    images: {
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      path: "/_next/image",
      loader: "default",
      domains: [],
      disableStaticImages: false,
    },
    devIndicators: {
      buildActivity: true,
    },
    onDemandEntries: {
      maxInactiveAge: 60000,
      pagesBufferLength: 2,
    },
    amp: {
      canonicalBase: "",
    },
    basePath: "",
    sassOptions: {},
    trailingSlash: false,
    i18n: null,
    productionBrowserSourceMaps: false,
    optimizeFonts: true,
    experimental: {
      cpus: 11,
      plugins: false,
      profiling: false,
      sprFlushToDisk: true,
      workerThreads: false,
      pageEnv: false,
      optimizeImages: false,
      optimizeCss: false,
      scrollRestoration: false,
      stats: false,
      externalDir: false,
      reactRoot: false,
      disableOptimizedLoading: false,
      gzipSize: true,
      craCompat: false,
    },
    webpack5: undefined,
    excludeDefaultMomentLocales: true,
    future: {
      strictPostcssConfiguration: false,
    },
    serverRuntimeConfig: {},
    publicRuntimeConfig: {
      dogs: "yes",
      cats: "maybe",
    },
    reactStrictMode: false,
    configFile:
      "/Users/Katie/Documents/Sentry/test-apps/next-js-test/next.config.js",
  },
  defaultLoaders: {
    babel: {
      loader:
        "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/build/babel/loader/index.js",
      options: {
        configFile: undefined,
        isServer: false,
        distDir: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/.next",
        pagesDir: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/pages",
        cwd: "/Users/Katie/Documents/Sentry/test-apps/next-js-test",
        cache: false,
        development: false,
        hasReactRefresh: false,
        hasJsxRuntime: true,
      },
    },
    hotSelfAccept: {
      loader: "noop-loader",
    },
  },
  totalPages: 7,
  webpack: (...args) => {
    return fac()(...args);
  },
};

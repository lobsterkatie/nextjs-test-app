next 12:

[
  {
    test: {
    },
    resolve: {
      fullySpecified: false,
    },
  },
  {
    test: {
    },
    issuerLayer: "api",
    parser: {
      url: true,
    },
  },
  {
    oneOf: [
      {
        test: /\.(tsx|ts|js|cjs|mjs|jsx)$/,
        include: [
          "/Users/Katie/Documents/Sentry/test-apps/next-js-test",
          {
          },
          {
          },
          {
          },
          {
          },
        ],
        exclude: (excludePath)=>{
          if (babelIncludeRegexes.some((r)=>r.test(excludePath)
          )) {
              return false;
          }
          return /node_modules/.test(excludePath);
        },
        issuerLayer: "api",
        parser: {
          url: true,
        },
        use: {
          loader: "next-swc-loader",
          options: {
            isServer: false,
            pagesDir: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/pages",
            hasReactRefresh: false,
            fileReading: true,
            nextConfig: {
              env: {
              },
              webpack: (incomingConfig, buildContext) => {
                const { isServer, dev: isDev } = buildContext;
                let newConfig = { ...incomingConfig };

                // if user has custom webpack config (which always takes the form of a function), run it so we have actual values to
                // work with
                if ('webpack' in userNextConfig && typeof userNextConfig.webpack === 'function') {
                  newConfig = userNextConfig.webpack(newConfig, buildContext);
                }

                if (isServer) {
                  newConfig.module = {
                    ...newConfig.module,
                    rules: [
                      ...(_optionalChain([newConfig, 'access', _ => _.module, 'optionalAccess', _2 => _2.rules]) || []),
                      {
                        test: /sentry\.server\.config\.(jsx?|tsx?)/,
                        use: [
                          {
                            // Support non-default output directories by making the output path (easy to get here at build-time)
                            // available to the server SDK's default `RewriteFrames` instance (which needs it at runtime), by
                            // injecting code to attach it to `global`.
                            loader: path.resolve(__dirname, 'prefixLoader.js'),
                            options: {
                              distDir: userNextConfig.distDir || '.next',
                            },
                          },
                        ],
                      },
                    ],
                  };
                }
                console.log(newConfig);
                debugger;

                // @ts-ignore testing
                    // var babelRule = newConfig.module.rules.filter(rule => rule.use.loader === 'next-babel-loader')[0];

                // @ts-ignore testing
                    var babelRule = newConfig.module.rules.filter(rule => _optionalChain([rule, 'access', _3 => _3.use, 'optionalAccess', _4 => _4.loader]) === 'next-babel-loader')[0];
                    var origExclude = babelRule.exclude;
                var newExclude = (filepath) => {
                  if (filepath.includes('@sentry')) {
                    console.log('found sentry module', filepath);
                    return false;
                  }
                  return origExclude(filepath);
                };
                    // babelRule.exclude = newExclude;

                // console.log(babelRule);
                debugger;

                // Tell webpack to inject user config files (containing the two `Sentry.init()` calls) into the appropriate output
                // bundles. Store a separate reference to the original `entry` value to avoid an infinite loop. (If we don't do
                // this, we'll have a statement of the form `x.y = () => f(x.y)`, where one of the things `f` does is call `x.y`.
                // Since we're setting `x.y` to be a callback (which, by definition, won't run until some time later), by the time
                // the function runs (causing `f` to run, causing `x.y` to run), `x.y` will point to the callback itself, rather
                // than its original value. So calling it will call the callback which will call `f` which will call `x.y` which
                // will call the callback which will call `f` which will call `x.y`... and on and on. Theoretically this could also
                // be fixed by using `bind`, but this is way simpler.)
                var origEntryProperty = newConfig.entry;
                newConfig.entry = async () => addSentryToEntryProperty(origEntryProperty, buildContext);

                // Enable the Sentry plugin (which uploads source maps to Sentry when not in dev) by default
                var enableWebpackPlugin =
                  // TODO: this is a hack to fix https://github.com/getsentry/sentry-cli/issues/1085, which is caused by
                  // https://github.com/getsentry/sentry-cli/issues/915. Once the latter is addressed, this existence check can come
                  // out. (The check is necessary because currently, `@sentry/cli` uses a post-install script to download an
                  // architecture-specific version of the `sentry-cli` binary. If `yarn install`, `npm install`, or `npm ci` are run
                  // with the `--ignore-scripts` option, this will be blocked and the missing binary will cause an error when users
                  // try to build their apps.)
                  ensureCLIBinaryExists() &&
                  (isServer
                    ? !_optionalChain([userNextConfig, 'access', _5 => _5.sentry, 'optionalAccess', _6 => _6.disableServerWebpackPlugin])
                    : !_optionalChain([userNextConfig, 'access', _7 => _7.sentry, 'optionalAccess', _8 => _8.disableClientWebpackPlugin]));

                if (enableWebpackPlugin) {
                  // TODO Handle possibility that user is using `SourceMapDevToolPlugin` (see
                  // https://webpack.js.org/plugins/source-map-dev-tool-plugin/)

                  // Next doesn't let you change `devtool` in dev even if you want to, so don't bother trying - see
                  // https://github.com/vercel/next.js/blob/master/errors/improper-devtool.md
                  if (!isDev) {
                    // `hidden-source-map` produces the same sourcemaps as `source-map`, but doesn't include the `sourceMappingURL`
                    // comment at the bottom. For folks who aren't publicly hosting their sourcemaps, this is helpful because then
                    // the browser won't look for them and throw errors into the console when it can't find them. Because this is a
                    // front-end-only problem, and because `sentry-cli` handles sourcemaps more reliably with the comment than
                    // without, the option to use `hidden-source-map` only applies to the client-side build.
                    newConfig.devtool = _optionalChain([userNextConfig, 'access', _9 => _9.sentry, 'optionalAccess', _10 => _10.hideSourceMaps]) && !isServer ? 'hidden-source-map' : 'source-map';
                  }

                  newConfig.plugins = newConfig.plugins || [];
                  newConfig.plugins.push(
                    new SentryWebpackPlugin.default(getWebpackPluginOptions(buildContext, userSentryWebpackPluginOptions)),
                  );
                }

                return newConfig;
              },
              webpackDevMiddleware: null,
              eslint: {
                ignoreDuringBuilds: false,
              },
              typescript: {
                ignoreBuildErrors: false,
                tsconfigPath: "tsconfig.json",
              },
              distDir: ".next",
              cleanDistDir: true,
              assetPrefix: "",
              configOrigin: "next.config.js",
              useFileSystemPublicRoutes: true,
              generateBuildId: ()=>null,
              generateEtags: true,
              pageExtensions: [
                "tsx",
                "ts",
                "jsx",
                "js",
              ],
              target: "server",
              poweredByHeader: true,
              compress: true,
              analyticsId: "",
              images: {
                deviceSizes: [
                  640,
                  750,
                  828,
                  1080,
                  1200,
                  1920,
                  2048,
                  3840,
                ],
                imageSizes: [
                  16,
                  32,
                  48,
                  64,
                  96,
                  128,
                  256,
                  384,
                ],
                path: "/_next/image",
                loader: "default",
                domains: [
                ],
                disableStaticImages: false,
                minimumCacheTTL: 60,
                formats: [
                  "image/webp",
                ],
              },
              devIndicators: {
                buildActivity: true,
                buildActivityPosition: "bottom-right",
              },
              onDemandEntries: {
                maxInactiveAge: 15000,
                pagesBufferLength: 2,
              },
              amp: {
                canonicalBase: "",
              },
              basePath: "",
              sassOptions: {
              },
              trailingSlash: false,
              i18n: null,
              productionBrowserSourceMaps: false,
              optimizeFonts: true,
              webpack5: undefined,
              excludeDefaultMomentLocales: true,
              serverRuntimeConfig: {
              },
              publicRuntimeConfig: {
                dogs: "yes",
                cats: "maybe",
              },
              reactStrictMode: false,
              httpAgentOptions: {
                keepAlive: true,
              },
              outputFileTracing: true,
              staticPageGenerationTimeout: 60,
              swcMinify: false,
              experimental: {
                cpus: 11,
                sharedPool: true,
                plugins: false,
                profiling: false,
                isrFlushToDisk: true,
                workerThreads: false,
                pageEnv: false,
                optimizeImages: false,
                optimizeCss: false,
                scrollRestoration: false,
                externalDir: false,
                reactRoot: false,
                disableOptimizedLoading: false,
                gzipSize: true,
                swcFileReading: true,
                craCompat: false,
                esmExternals: true,
                isrMemoryCacheSize: 52428800,
                concurrentFeatures: false,
                serverComponents: false,
                fullySpecified: false,
                outputFileTracingRoot: "",
                outputStandalone: false,
              },
              configFile: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/next.config.js",
              configFileName: "next.config.js",
              defaultConfig: {
                env: {
                },
                eslint: {
                  ignoreDuringBuilds: false,
                },
                typescript: {
                  ignoreBuildErrors: false,
                  tsconfigPath: "tsconfig.json",
                },
                distDir: ".next",
                cleanDistDir: true,
                assetPrefix: "",
                configOrigin: "default",
                useFileSystemPublicRoutes: true,
                generateBuildId: ()=>null,
                generateEtags: true,
                pageExtensions: [
                  "tsx",
                  "ts",
                  "jsx",
                  "js",
                ],
                target: "server",
                poweredByHeader: true,
                compress: true,
                analyticsId: "",
                images: {
                  deviceSizes: [
                    640,
                    750,
                    828,
                    1080,
                    1200,
                    1920,
                    2048,
                    3840,
                  ],
                  imageSizes: [
                    16,
                    32,
                    48,
                    64,
                    96,
                    128,
                    256,
                    384,
                  ],
                  path: "/_next/image",
                  loader: "default",
                  domains: [
                  ],
                  disableStaticImages: false,
                  minimumCacheTTL: 60,
                  formats: [
                    "image/webp",
                  ],
                },
                devIndicators: {
                  buildActivity: true,
                  buildActivityPosition: "bottom-right",
                },
                onDemandEntries: {
                  maxInactiveAge: 15000,
                  pagesBufferLength: 2,
                },
                amp: {
                  canonicalBase: "",
                },
                basePath: "",
                sassOptions: {
                },
                trailingSlash: false,
                productionBrowserSourceMaps: false,
                optimizeFonts: true,
                excludeDefaultMomentLocales: true,
                serverRuntimeConfig: {
                },
                publicRuntimeConfig: {
                },
                reactStrictMode: false,
                httpAgentOptions: {
                  keepAlive: true,
                },
                outputFileTracing: true,
                staticPageGenerationTimeout: 60,
                swcMinify: false,
                experimental: {
                  cpus: 11,
                  sharedPool: true,
                  plugins: false,
                  profiling: false,
                  isrFlushToDisk: true,
                  workerThreads: false,
                  pageEnv: false,
                  optimizeImages: false,
                  optimizeCss: false,
                  scrollRestoration: false,
                  externalDir: false,
                  reactRoot: false,
                  disableOptimizedLoading: false,
                  gzipSize: true,
                  swcFileReading: true,
                  craCompat: false,
                  esmExternals: true,
                  isrMemoryCacheSize: 52428800,
                  concurrentFeatures: false,
                  serverComponents: false,
                  fullySpecified: false,
                  outputFileTracingRoot: "",
                  outputStandalone: false,
                },
              },
              sentry: {
                configDir: "sentryConfig",
              },
            },
            jsConfig: {
              compilerOptions: {
                target: 1,
                lib: [
                  "lib.dom.d.ts",
                  "lib.dom.iterable.d.ts",
                  "lib.esnext.d.ts",
                ],
                allowJs: true,
                skipLibCheck: true,
                strict: false,
                forceConsistentCasingInFileNames: true,
                noEmit: true,
                incremental: true,
                esModuleInterop: true,
                module: 99,
                moduleResolution: 2,
                resolveJsonModule: true,
                isolatedModules: true,
                jsx: 1,
                configFilePath: undefined,
              },
            },
          },
        },
      },
      {
        test: {
        },
        include: [
          "/Users/Katie/Documents/Sentry/test-apps/next-js-test",
          {
          },
          {
          },
          {
          },
          {
          },
        ],
        exclude: (excludePath)=>{
          if (babelIncludeRegexes.some((r)=>r.test(excludePath)
          )) {
              return false;
          }
          return /node_modules/.test(excludePath);
        },
        issuerLayer: "middleware",
        use: {
          loader: "next-swc-loader",
          options: {
            isServer: true,
            pagesDir: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/pages",
            hasReactRefresh: false,
            fileReading: true,
            nextConfig: {
              env: {
              },
              webpack: (incomingConfig, buildContext) => {
                const { isServer, dev: isDev } = buildContext;
                let newConfig = { ...incomingConfig };

                // if user has custom webpack config (which always takes the form of a function), run it so we have actual values to
                // work with
                if ('webpack' in userNextConfig && typeof userNextConfig.webpack === 'function') {
                  newConfig = userNextConfig.webpack(newConfig, buildContext);
                }

                if (isServer) {
                  newConfig.module = {
                    ...newConfig.module,
                    rules: [
                      ...(_optionalChain([newConfig, 'access', _ => _.module, 'optionalAccess', _2 => _2.rules]) || []),
                      {
                        test: /sentry\.server\.config\.(jsx?|tsx?)/,
                        use: [
                          {
                            // Support non-default output directories by making the output path (easy to get here at build-time)
                            // available to the server SDK's default `RewriteFrames` instance (which needs it at runtime), by
                            // injecting code to attach it to `global`.
                            loader: path.resolve(__dirname, 'prefixLoader.js'),
                            options: {
                              distDir: userNextConfig.distDir || '.next',
                            },
                          },
                        ],
                      },
                    ],
                  };
                }
                console.log(newConfig);
                debugger;

                // @ts-ignore testing
                    // var babelRule = newConfig.module.rules.filter(rule => rule.use.loader === 'next-babel-loader')[0];

                // @ts-ignore testing
                    var babelRule = newConfig.module.rules.filter(rule => _optionalChain([rule, 'access', _3 => _3.use, 'optionalAccess', _4 => _4.loader]) === 'next-babel-loader')[0];
                    var origExclude = babelRule.exclude;
                var newExclude = (filepath) => {
                  if (filepath.includes('@sentry')) {
                    console.log('found sentry module', filepath);
                    return false;
                  }
                  return origExclude(filepath);
                };
                    // babelRule.exclude = newExclude;

                // console.log(babelRule);
                debugger;

                // Tell webpack to inject user config files (containing the two `Sentry.init()` calls) into the appropriate output
                // bundles. Store a separate reference to the original `entry` value to avoid an infinite loop. (If we don't do
                // this, we'll have a statement of the form `x.y = () => f(x.y)`, where one of the things `f` does is call `x.y`.
                // Since we're setting `x.y` to be a callback (which, by definition, won't run until some time later), by the time
                // the function runs (causing `f` to run, causing `x.y` to run), `x.y` will point to the callback itself, rather
                // than its original value. So calling it will call the callback which will call `f` which will call `x.y` which
                // will call the callback which will call `f` which will call `x.y`... and on and on. Theoretically this could also
                // be fixed by using `bind`, but this is way simpler.)
                var origEntryProperty = newConfig.entry;
                newConfig.entry = async () => addSentryToEntryProperty(origEntryProperty, buildContext);

                // Enable the Sentry plugin (which uploads source maps to Sentry when not in dev) by default
                var enableWebpackPlugin =
                  // TODO: this is a hack to fix https://github.com/getsentry/sentry-cli/issues/1085, which is caused by
                  // https://github.com/getsentry/sentry-cli/issues/915. Once the latter is addressed, this existence check can come
                  // out. (The check is necessary because currently, `@sentry/cli` uses a post-install script to download an
                  // architecture-specific version of the `sentry-cli` binary. If `yarn install`, `npm install`, or `npm ci` are run
                  // with the `--ignore-scripts` option, this will be blocked and the missing binary will cause an error when users
                  // try to build their apps.)
                  ensureCLIBinaryExists() &&
                  (isServer
                    ? !_optionalChain([userNextConfig, 'access', _5 => _5.sentry, 'optionalAccess', _6 => _6.disableServerWebpackPlugin])
                    : !_optionalChain([userNextConfig, 'access', _7 => _7.sentry, 'optionalAccess', _8 => _8.disableClientWebpackPlugin]));

                if (enableWebpackPlugin) {
                  // TODO Handle possibility that user is using `SourceMapDevToolPlugin` (see
                  // https://webpack.js.org/plugins/source-map-dev-tool-plugin/)

                  // Next doesn't let you change `devtool` in dev even if you want to, so don't bother trying - see
                  // https://github.com/vercel/next.js/blob/master/errors/improper-devtool.md
                  if (!isDev) {
                    // `hidden-source-map` produces the same sourcemaps as `source-map`, but doesn't include the `sourceMappingURL`
                    // comment at the bottom. For folks who aren't publicly hosting their sourcemaps, this is helpful because then
                    // the browser won't look for them and throw errors into the console when it can't find them. Because this is a
                    // front-end-only problem, and because `sentry-cli` handles sourcemaps more reliably with the comment than
                    // without, the option to use `hidden-source-map` only applies to the client-side build.
                    newConfig.devtool = _optionalChain([userNextConfig, 'access', _9 => _9.sentry, 'optionalAccess', _10 => _10.hideSourceMaps]) && !isServer ? 'hidden-source-map' : 'source-map';
                  }

                  newConfig.plugins = newConfig.plugins || [];
                  newConfig.plugins.push(
                    new SentryWebpackPlugin.default(getWebpackPluginOptions(buildContext, userSentryWebpackPluginOptions)),
                  );
                }

                return newConfig;
              },
              webpackDevMiddleware: null,
              eslint: {
                ignoreDuringBuilds: false,
              },
              typescript: {
                ignoreBuildErrors: false,
                tsconfigPath: "tsconfig.json",
              },
              distDir: ".next",
              cleanDistDir: true,
              assetPrefix: "",
              configOrigin: "next.config.js",
              useFileSystemPublicRoutes: true,
              generateBuildId: ()=>null,
              generateEtags: true,
              pageExtensions: [
                "tsx",
                "ts",
                "jsx",
                "js",
              ],
              target: "server",
              poweredByHeader: true,
              compress: true,
              analyticsId: "",
              images: {
                deviceSizes: [
                  640,
                  750,
                  828,
                  1080,
                  1200,
                  1920,
                  2048,
                  3840,
                ],
                imageSizes: [
                  16,
                  32,
                  48,
                  64,
                  96,
                  128,
                  256,
                  384,
                ],
                path: "/_next/image",
                loader: "default",
                domains: [
                ],
                disableStaticImages: false,
                minimumCacheTTL: 60,
                formats: [
                  "image/webp",
                ],
              },
              devIndicators: {
                buildActivity: true,
                buildActivityPosition: "bottom-right",
              },
              onDemandEntries: {
                maxInactiveAge: 15000,
                pagesBufferLength: 2,
              },
              amp: {
                canonicalBase: "",
              },
              basePath: "",
              sassOptions: {
              },
              trailingSlash: false,
              i18n: null,
              productionBrowserSourceMaps: false,
              optimizeFonts: true,
              webpack5: undefined,
              excludeDefaultMomentLocales: true,
              serverRuntimeConfig: {
              },
              publicRuntimeConfig: {
                dogs: "yes",
                cats: "maybe",
              },
              reactStrictMode: false,
              httpAgentOptions: {
                keepAlive: true,
              },
              outputFileTracing: true,
              staticPageGenerationTimeout: 60,
              swcMinify: false,
              experimental: {
                cpus: 11,
                sharedPool: true,
                plugins: false,
                profiling: false,
                isrFlushToDisk: true,
                workerThreads: false,
                pageEnv: false,
                optimizeImages: false,
                optimizeCss: false,
                scrollRestoration: false,
                externalDir: false,
                reactRoot: false,
                disableOptimizedLoading: false,
                gzipSize: true,
                swcFileReading: true,
                craCompat: false,
                esmExternals: true,
                isrMemoryCacheSize: 52428800,
                concurrentFeatures: false,
                serverComponents: false,
                fullySpecified: false,
                outputFileTracingRoot: "",
                outputStandalone: false,
              },
              configFile: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/next.config.js",
              configFileName: "next.config.js",
              defaultConfig: {
                env: {
                },
                eslint: {
                  ignoreDuringBuilds: false,
                },
                typescript: {
                  ignoreBuildErrors: false,
                  tsconfigPath: "tsconfig.json",
                },
                distDir: ".next",
                cleanDistDir: true,
                assetPrefix: "",
                configOrigin: "default",
                useFileSystemPublicRoutes: true,
                generateBuildId: ()=>null,
                generateEtags: true,
                pageExtensions: [
                  "tsx",
                  "ts",
                  "jsx",
                  "js",
                ],
                target: "server",
                poweredByHeader: true,
                compress: true,
                analyticsId: "",
                images: {
                  deviceSizes: [
                    640,
                    750,
                    828,
                    1080,
                    1200,
                    1920,
                    2048,
                    3840,
                  ],
                  imageSizes: [
                    16,
                    32,
                    48,
                    64,
                    96,
                    128,
                    256,
                    384,
                  ],
                  path: "/_next/image",
                  loader: "default",
                  domains: [
                  ],
                  disableStaticImages: false,
                  minimumCacheTTL: 60,
                  formats: [
                    "image/webp",
                  ],
                },
                devIndicators: {
                  buildActivity: true,
                  buildActivityPosition: "bottom-right",
                },
                onDemandEntries: {
                  maxInactiveAge: 15000,
                  pagesBufferLength: 2,
                },
                amp: {
                  canonicalBase: "",
                },
                basePath: "",
                sassOptions: {
                },
                trailingSlash: false,
                productionBrowserSourceMaps: false,
                optimizeFonts: true,
                excludeDefaultMomentLocales: true,
                serverRuntimeConfig: {
                },
                publicRuntimeConfig: {
                },
                reactStrictMode: false,
                httpAgentOptions: {
                  keepAlive: true,
                },
                outputFileTracing: true,
                staticPageGenerationTimeout: 60,
                swcMinify: false,
                experimental: {
                  cpus: 11,
                  sharedPool: true,
                  plugins: false,
                  profiling: false,
                  isrFlushToDisk: true,
                  workerThreads: false,
                  pageEnv: false,
                  optimizeImages: false,
                  optimizeCss: false,
                  scrollRestoration: false,
                  externalDir: false,
                  reactRoot: false,
                  disableOptimizedLoading: false,
                  gzipSize: true,
                  swcFileReading: true,
                  craCompat: false,
                  esmExternals: true,
                  isrMemoryCacheSize: 52428800,
                  concurrentFeatures: false,
                  serverComponents: false,
                  fullySpecified: false,
                  outputFileTracingRoot: "",
                  outputStandalone: false,
                },
              },
              sentry: {
                configDir: "sentryConfig",
              },
            },
            jsConfig: {
              compilerOptions: {
                target: 1,
                lib: [
                  "lib.dom.d.ts",
                  "lib.dom.iterable.d.ts",
                  "lib.esnext.d.ts",
                ],
                allowJs: true,
                skipLibCheck: true,
                strict: false,
                forceConsistentCasingInFileNames: true,
                noEmit: true,
                incremental: true,
                esModuleInterop: true,
                module: 99,
                moduleResolution: 2,
                resolveJsonModule: true,
                isolatedModules: true,
                jsx: 1,
                configFilePath: undefined,
              },
            },
          },
        },
      },
      {
        test: {
        },
        include: [
          "/Users/Katie/Documents/Sentry/test-apps/next-js-test",
          {
          },
          {
          },
          {
          },
          {
          },
        ],
        exclude: (excludePath)=>{
          if (babelIncludeRegexes.some((r)=>r.test(excludePath)
          )) {
              return false;
          }
          return /node_modules/.test(excludePath);
        },
        use: {
          loader: "next-swc-loader",
          options: {
            isServer: false,
            pagesDir: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/pages",
            hasReactRefresh: false,
            fileReading: true,
            nextConfig: {
              env: {
              },
              webpack: (incomingConfig, buildContext) => {
                const { isServer, dev: isDev } = buildContext;
                let newConfig = { ...incomingConfig };

                // if user has custom webpack config (which always takes the form of a function), run it so we have actual values to
                // work with
                if ('webpack' in userNextConfig && typeof userNextConfig.webpack === 'function') {
                  newConfig = userNextConfig.webpack(newConfig, buildContext);
                }

                if (isServer) {
                  newConfig.module = {
                    ...newConfig.module,
                    rules: [
                      ...(_optionalChain([newConfig, 'access', _ => _.module, 'optionalAccess', _2 => _2.rules]) || []),
                      {
                        test: /sentry\.server\.config\.(jsx?|tsx?)/,
                        use: [
                          {
                            // Support non-default output directories by making the output path (easy to get here at build-time)
                            // available to the server SDK's default `RewriteFrames` instance (which needs it at runtime), by
                            // injecting code to attach it to `global`.
                            loader: path.resolve(__dirname, 'prefixLoader.js'),
                            options: {
                              distDir: userNextConfig.distDir || '.next',
                            },
                          },
                        ],
                      },
                    ],
                  };
                }
                console.log(newConfig);
                debugger;

                // @ts-ignore testing
                    // var babelRule = newConfig.module.rules.filter(rule => rule.use.loader === 'next-babel-loader')[0];

                // @ts-ignore testing
                    var babelRule = newConfig.module.rules.filter(rule => _optionalChain([rule, 'access', _3 => _3.use, 'optionalAccess', _4 => _4.loader]) === 'next-babel-loader')[0];
                    var origExclude = babelRule.exclude;
                var newExclude = (filepath) => {
                  if (filepath.includes('@sentry')) {
                    console.log('found sentry module', filepath);
                    return false;
                  }
                  return origExclude(filepath);
                };
                    // babelRule.exclude = newExclude;

                // console.log(babelRule);
                debugger;

                // Tell webpack to inject user config files (containing the two `Sentry.init()` calls) into the appropriate output
                // bundles. Store a separate reference to the original `entry` value to avoid an infinite loop. (If we don't do
                // this, we'll have a statement of the form `x.y = () => f(x.y)`, where one of the things `f` does is call `x.y`.
                // Since we're setting `x.y` to be a callback (which, by definition, won't run until some time later), by the time
                // the function runs (causing `f` to run, causing `x.y` to run), `x.y` will point to the callback itself, rather
                // than its original value. So calling it will call the callback which will call `f` which will call `x.y` which
                // will call the callback which will call `f` which will call `x.y`... and on and on. Theoretically this could also
                // be fixed by using `bind`, but this is way simpler.)
                var origEntryProperty = newConfig.entry;
                newConfig.entry = async () => addSentryToEntryProperty(origEntryProperty, buildContext);

                // Enable the Sentry plugin (which uploads source maps to Sentry when not in dev) by default
                var enableWebpackPlugin =
                  // TODO: this is a hack to fix https://github.com/getsentry/sentry-cli/issues/1085, which is caused by
                  // https://github.com/getsentry/sentry-cli/issues/915. Once the latter is addressed, this existence check can come
                  // out. (The check is necessary because currently, `@sentry/cli` uses a post-install script to download an
                  // architecture-specific version of the `sentry-cli` binary. If `yarn install`, `npm install`, or `npm ci` are run
                  // with the `--ignore-scripts` option, this will be blocked and the missing binary will cause an error when users
                  // try to build their apps.)
                  ensureCLIBinaryExists() &&
                  (isServer
                    ? !_optionalChain([userNextConfig, 'access', _5 => _5.sentry, 'optionalAccess', _6 => _6.disableServerWebpackPlugin])
                    : !_optionalChain([userNextConfig, 'access', _7 => _7.sentry, 'optionalAccess', _8 => _8.disableClientWebpackPlugin]));

                if (enableWebpackPlugin) {
                  // TODO Handle possibility that user is using `SourceMapDevToolPlugin` (see
                  // https://webpack.js.org/plugins/source-map-dev-tool-plugin/)

                  // Next doesn't let you change `devtool` in dev even if you want to, so don't bother trying - see
                  // https://github.com/vercel/next.js/blob/master/errors/improper-devtool.md
                  if (!isDev) {
                    // `hidden-source-map` produces the same sourcemaps as `source-map`, but doesn't include the `sourceMappingURL`
                    // comment at the bottom. For folks who aren't publicly hosting their sourcemaps, this is helpful because then
                    // the browser won't look for them and throw errors into the console when it can't find them. Because this is a
                    // front-end-only problem, and because `sentry-cli` handles sourcemaps more reliably with the comment than
                    // without, the option to use `hidden-source-map` only applies to the client-side build.
                    newConfig.devtool = _optionalChain([userNextConfig, 'access', _9 => _9.sentry, 'optionalAccess', _10 => _10.hideSourceMaps]) && !isServer ? 'hidden-source-map' : 'source-map';
                  }

                  newConfig.plugins = newConfig.plugins || [];
                  newConfig.plugins.push(
                    new SentryWebpackPlugin.default(getWebpackPluginOptions(buildContext, userSentryWebpackPluginOptions)),
                  );
                }

                return newConfig;
              },
              webpackDevMiddleware: null,
              eslint: {
                ignoreDuringBuilds: false,
              },
              typescript: {
                ignoreBuildErrors: false,
                tsconfigPath: "tsconfig.json",
              },
              distDir: ".next",
              cleanDistDir: true,
              assetPrefix: "",
              configOrigin: "next.config.js",
              useFileSystemPublicRoutes: true,
              generateBuildId: ()=>null,
              generateEtags: true,
              pageExtensions: [
                "tsx",
                "ts",
                "jsx",
                "js",
              ],
              target: "server",
              poweredByHeader: true,
              compress: true,
              analyticsId: "",
              images: {
                deviceSizes: [
                  640,
                  750,
                  828,
                  1080,
                  1200,
                  1920,
                  2048,
                  3840,
                ],
                imageSizes: [
                  16,
                  32,
                  48,
                  64,
                  96,
                  128,
                  256,
                  384,
                ],
                path: "/_next/image",
                loader: "default",
                domains: [
                ],
                disableStaticImages: false,
                minimumCacheTTL: 60,
                formats: [
                  "image/webp",
                ],
              },
              devIndicators: {
                buildActivity: true,
                buildActivityPosition: "bottom-right",
              },
              onDemandEntries: {
                maxInactiveAge: 15000,
                pagesBufferLength: 2,
              },
              amp: {
                canonicalBase: "",
              },
              basePath: "",
              sassOptions: {
              },
              trailingSlash: false,
              i18n: null,
              productionBrowserSourceMaps: false,
              optimizeFonts: true,
              webpack5: undefined,
              excludeDefaultMomentLocales: true,
              serverRuntimeConfig: {
              },
              publicRuntimeConfig: {
                dogs: "yes",
                cats: "maybe",
              },
              reactStrictMode: false,
              httpAgentOptions: {
                keepAlive: true,
              },
              outputFileTracing: true,
              staticPageGenerationTimeout: 60,
              swcMinify: false,
              experimental: {
                cpus: 11,
                sharedPool: true,
                plugins: false,
                profiling: false,
                isrFlushToDisk: true,
                workerThreads: false,
                pageEnv: false,
                optimizeImages: false,
                optimizeCss: false,
                scrollRestoration: false,
                externalDir: false,
                reactRoot: false,
                disableOptimizedLoading: false,
                gzipSize: true,
                swcFileReading: true,
                craCompat: false,
                esmExternals: true,
                isrMemoryCacheSize: 52428800,
                concurrentFeatures: false,
                serverComponents: false,
                fullySpecified: false,
                outputFileTracingRoot: "",
                outputStandalone: false,
              },
              configFile: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/next.config.js",
              configFileName: "next.config.js",
              defaultConfig: {
                env: {
                },
                eslint: {
                  ignoreDuringBuilds: false,
                },
                typescript: {
                  ignoreBuildErrors: false,
                  tsconfigPath: "tsconfig.json",
                },
                distDir: ".next",
                cleanDistDir: true,
                assetPrefix: "",
                configOrigin: "default",
                useFileSystemPublicRoutes: true,
                generateBuildId: ()=>null,
                generateEtags: true,
                pageExtensions: [
                  "tsx",
                  "ts",
                  "jsx",
                  "js",
                ],
                target: "server",
                poweredByHeader: true,
                compress: true,
                analyticsId: "",
                images: {
                  deviceSizes: [
                    640,
                    750,
                    828,
                    1080,
                    1200,
                    1920,
                    2048,
                    3840,
                  ],
                  imageSizes: [
                    16,
                    32,
                    48,
                    64,
                    96,
                    128,
                    256,
                    384,
                  ],
                  path: "/_next/image",
                  loader: "default",
                  domains: [
                  ],
                  disableStaticImages: false,
                  minimumCacheTTL: 60,
                  formats: [
                    "image/webp",
                  ],
                },
                devIndicators: {
                  buildActivity: true,
                  buildActivityPosition: "bottom-right",
                },
                onDemandEntries: {
                  maxInactiveAge: 15000,
                  pagesBufferLength: 2,
                },
                amp: {
                  canonicalBase: "",
                },
                basePath: "",
                sassOptions: {
                },
                trailingSlash: false,
                productionBrowserSourceMaps: false,
                optimizeFonts: true,
                excludeDefaultMomentLocales: true,
                serverRuntimeConfig: {
                },
                publicRuntimeConfig: {
                },
                reactStrictMode: false,
                httpAgentOptions: {
                  keepAlive: true,
                },
                outputFileTracing: true,
                staticPageGenerationTimeout: 60,
                swcMinify: false,
                experimental: {
                  cpus: 11,
                  sharedPool: true,
                  plugins: false,
                  profiling: false,
                  isrFlushToDisk: true,
                  workerThreads: false,
                  pageEnv: false,
                  optimizeImages: false,
                  optimizeCss: false,
                  scrollRestoration: false,
                  externalDir: false,
                  reactRoot: false,
                  disableOptimizedLoading: false,
                  gzipSize: true,
                  swcFileReading: true,
                  craCompat: false,
                  esmExternals: true,
                  isrMemoryCacheSize: 52428800,
                  concurrentFeatures: false,
                  serverComponents: false,
                  fullySpecified: false,
                  outputFileTracingRoot: "",
                  outputStandalone: false,
                },
              },
              sentry: {
                configDir: "sentryConfig",
              },
            },
            jsConfig: {
              compilerOptions: {
                target: 1,
                lib: [
                  "lib.dom.d.ts",
                  "lib.dom.iterable.d.ts",
                  "lib.esnext.d.ts",
                ],
                allowJs: true,
                skipLibCheck: true,
                strict: false,
                forceConsistentCasingInFileNames: true,
                noEmit: true,
                incremental: true,
                esModuleInterop: true,
                module: 99,
                moduleResolution: 2,
                resolveJsonModule: true,
                isolatedModules: true,
                jsx: 1,
                configFilePath: undefined,
              },
            },
          },
        },
      },
      {
        test: {
        },
        issuer: {
        },
        use: {
          loader: "error-loader",
          options: {
            reason: "CSS cannot be imported within pages/_document.js. Please move global styles to pages/_app.js.",
          },
        },
      },
      {
        sideEffects: false,
        test: {
        },
        issuer: {
          and: [
            "/Users/Katie/Documents/Sentry/test-apps/next-js-test",
          ],
          not: [
            {
            },
          ],
        },
        use: [
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/compiled/mini-css-extract-plugin/loader.js",
            options: {
              publicPath: "/_next/",
              esModule: false,
            },
          },
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js",
            options: {
              postcss: function(ctx.rootDirectory, ctx.supportedBrowsers, ctx.experimental.disablePostcssPresetEnv),
              importLoaders: 1,
              esModule: false,
              url: (url, resourcePath)=>(0, _fileResolve).cssFileResolve(url, resourcePath, ctx.experimental.urlImports),
              import: (url, _, resourcePath)=>(0, _fileResolve).cssFileResolve(url, resourcePath, ctx.experimental.urlImports),
              modules: {
                exportLocalsConvention: "asIs",
                exportOnlyLocals: false,
                mode: "pure",
                getLocalIdent: function getCssModuleLocalIdent(context, _, exportName, options) {
                  const relativePath = _path.default.relative(context.rootContext, context.resourcePath).replace(/\\+/g, '/');
                  // Generate a more meaningful name (parent folder) when the user names the
                  // file `index.module.css`.
                  const fileNameOrFolder = regexLikeIndexModule.test(relativePath) ? '[folder]' : '[name]';
                  // Generate a hash to make the class name unique.
                  const hash = _loaderUtils3.default.getHashDigest(Buffer.from(`filePath:${relativePath}#className:${exportName}`), 'md5', 'base64', 5);
                  // Have webpack interpolate the `[folder]` or `[name]` to its real value.
                  return _loaderUtils3.default.interpolateName(context, fileNameOrFolder + '_' + exportName + '__' + hash, options).replace(// Webpack name interpolation returns `about.module_root__2oFM9` for
                  // `.root {}` inside a file named `about.module.css`. Let's simplify
                  // this.
                  /\.module_/, '_')// Replace invalid symbols with underscores instead of escaping
                  // https://mathiasbynens.be/notes/css-escapes#identifiers-strings
                  .replace(/[^a-zA-Z0-9-_]/g, '_')// "they cannot start with a digit, two hyphens, or a hyphen followed by a digit [sic]"
                  // https://www.w3.org/TR/CSS21/syndata.html#characters
                  .replace(/^(\d|--|-\d)/, '__$1');
                },
              },
            },
          },
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js",
            options: {
              postcss: function(ctx.rootDirectory, ctx.supportedBrowsers, ctx.experimental.disablePostcssPresetEnv),
            },
          },
        ],
      },
      {
        sideEffects: false,
        test: {
        },
        issuer: {
          and: [
            "/Users/Katie/Documents/Sentry/test-apps/next-js-test",
          ],
          not: [
            {
            },
          ],
        },
        use: [
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/compiled/mini-css-extract-plugin/loader.js",
            options: {
              publicPath: "/_next/",
              esModule: false,
            },
          },
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js",
            options: {
              postcss: function(ctx.rootDirectory, ctx.supportedBrowsers, ctx.experimental.disablePostcssPresetEnv),
              importLoaders: 3,
              esModule: false,
              url: (url, resourcePath)=>(0, _fileResolve).cssFileResolve(url, resourcePath, ctx.experimental.urlImports),
              import: (url, _, resourcePath)=>(0, _fileResolve).cssFileResolve(url, resourcePath, ctx.experimental.urlImports),
              modules: {
                exportLocalsConvention: "asIs",
                exportOnlyLocals: false,
                mode: "pure",
                getLocalIdent: function getCssModuleLocalIdent(context, _, exportName, options) {
                  const relativePath = _path.default.relative(context.rootContext, context.resourcePath).replace(/\\+/g, '/');
                  // Generate a more meaningful name (parent folder) when the user names the
                  // file `index.module.css`.
                  const fileNameOrFolder = regexLikeIndexModule.test(relativePath) ? '[folder]' : '[name]';
                  // Generate a hash to make the class name unique.
                  const hash = _loaderUtils3.default.getHashDigest(Buffer.from(`filePath:${relativePath}#className:${exportName}`), 'md5', 'base64', 5);
                  // Have webpack interpolate the `[folder]` or `[name]` to its real value.
                  return _loaderUtils3.default.interpolateName(context, fileNameOrFolder + '_' + exportName + '__' + hash, options).replace(// Webpack name interpolation returns `about.module_root__2oFM9` for
                  // `.root {}` inside a file named `about.module.css`. Let's simplify
                  // this.
                  /\.module_/, '_')// Replace invalid symbols with underscores instead of escaping
                  // https://mathiasbynens.be/notes/css-escapes#identifiers-strings
                  .replace(/[^a-zA-Z0-9-_]/g, '_')// "they cannot start with a digit, two hyphens, or a hyphen followed by a digit [sic]"
                  // https://www.w3.org/TR/CSS21/syndata.html#characters
                  .replace(/^(\d|--|-\d)/, '__$1');
                },
              },
            },
          },
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js",
            options: {
              postcss: function(ctx.rootDirectory, ctx.supportedBrowsers, ctx.experimental.disablePostcssPresetEnv),
            },
          },
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/build/webpack/loaders/resolve-url-loader/index.js",
            options: {
              postcss: function(ctx.rootDirectory, ctx.supportedBrowsers, ctx.experimental.disablePostcssPresetEnv),
              sourceMap: true,
            },
          },
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/compiled/sass-loader/cjs.js",
            options: {
              sourceMap: true,
              sassOptions: {
              },
              additionalData: undefined,
            },
          },
        ],
      },
      {
        test: [
          {
          },
          {
          },
        ],
        use: {
          loader: "error-loader",
          options: {
            reason: "CSS Modules cannot be imported from within node_modules.\nRead more: https://nextjs.org/docs/messages/css-modules-npm",
          },
        },
      },
      {
        sideEffects: true,
        test: {
        },
        include: {
          and: [
            {
            },
          ],
        },
        issuer: {
          and: [
            "/Users/Katie/Documents/Sentry/test-apps/next-js-test",
          ],
          not: [
            {
            },
          ],
        },
        use: [
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/compiled/mini-css-extract-plugin/loader.js",
            options: {
              publicPath: "/_next/",
              esModule: false,
            },
          },
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js",
            options: {
              postcss: function(ctx.rootDirectory, ctx.supportedBrowsers, ctx.experimental.disablePostcssPresetEnv),
              importLoaders: 1,
              modules: false,
              url: (url, resourcePath)=>(0, _fileResolve).cssFileResolve(url, resourcePath, ctx.experimental.urlImports),
              import: (url, _, resourcePath)=>(0, _fileResolve).cssFileResolve(url, resourcePath, ctx.experimental.urlImports),
            },
          },
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js",
            options: {
              postcss: function(ctx.rootDirectory, ctx.supportedBrowsers, ctx.experimental.disablePostcssPresetEnv),
            },
          },
        ],
      },
      {
        sideEffects: true,
        test: {
        },
        issuer: {
          and: [
            {
            },
          ],
        },
        use: [
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/compiled/mini-css-extract-plugin/loader.js",
            options: {
              publicPath: "/_next/",
              esModule: false,
            },
          },
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js",
            options: {
              postcss: function(ctx.rootDirectory, ctx.supportedBrowsers, ctx.experimental.disablePostcssPresetEnv),
              importLoaders: 1,
              modules: false,
              url: (url, resourcePath)=>(0, _fileResolve).cssFileResolve(url, resourcePath, ctx.experimental.urlImports),
              import: (url, _, resourcePath)=>(0, _fileResolve).cssFileResolve(url, resourcePath, ctx.experimental.urlImports),
            },
          },
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js",
            options: {
              postcss: function(ctx.rootDirectory, ctx.supportedBrowsers, ctx.experimental.disablePostcssPresetEnv),
            },
          },
        ],
      },
      {
        sideEffects: true,
        test: {
        },
        issuer: {
          and: [
            {
            },
          ],
        },
        use: [
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/compiled/mini-css-extract-plugin/loader.js",
            options: {
              publicPath: "/_next/",
              esModule: false,
            },
          },
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js",
            options: {
              postcss: function(ctx.rootDirectory, ctx.supportedBrowsers, ctx.experimental.disablePostcssPresetEnv),
              importLoaders: 3,
              modules: false,
              url: (url, resourcePath)=>(0, _fileResolve).cssFileResolve(url, resourcePath, ctx.experimental.urlImports),
              import: (url, _, resourcePath)=>(0, _fileResolve).cssFileResolve(url, resourcePath, ctx.experimental.urlImports),
            },
          },
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js",
            options: {
              postcss: function(ctx.rootDirectory, ctx.supportedBrowsers, ctx.experimental.disablePostcssPresetEnv),
            },
          },
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/build/webpack/loaders/resolve-url-loader/index.js",
            options: {
              postcss: function(ctx.rootDirectory, ctx.supportedBrowsers, ctx.experimental.disablePostcssPresetEnv),
              sourceMap: true,
            },
          },
          {
            loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/compiled/sass-loader/cjs.js",
            options: {
              sourceMap: true,
              sassOptions: {
              },
              additionalData: undefined,
            },
          },
        ],
      },
      {
        test: [
          {
          },
          {
          },
        ],
        issuer: {
          and: [
            {
            },
          ],
        },
        use: {
          loader: "error-loader",
          options: {
            reason: "Global CSS cannot be imported from within node_modules.\nRead more: https://nextjs.org/docs/messages/css-npm",
          },
        },
      },
      {
        test: [
          {
          },
          {
          },
        ],
        use: {
          loader: "error-loader",
          options: {
            reason: "Global CSS cannot be imported from files other than your Custom <App>. Due to the Global nature of stylesheets, and to avoid conflicts, Please move all first-party global CSS imports to pages/_app.js. Or convert the import to Component-Level CSS (CSS Modules).\nRead more: https://nextjs.org/docs/messages/css-global",
          },
        },
      },
      {
        issuer: {
        },
        exclude: [
          {
          },
          {
          },
          {
          },
          {
          },
        ],
        type: "asset/resource",
      },
      {
        test: {
        },
        use: {
          loader: "error-loader",
          options: {
            reason: "Images cannot be imported within pages/_document.js. Please move image imports that need to be displayed on every page into pages/_app.js.\nRead more: https://nextjs.org/docs/messages/custom-document-image-import",
          },
        },
        issuer: {
        },
      },
    ],
  },
  {
    include: {
    },
    exclude: [
      {
      },
      {
      },
      {
      },
      {
      },
    ],
    issuerLayer: "middleware",
    layer: "",
  },
  {
    test: {
    },
    loader: "next-image-loader",
    issuer: {
      not: {
      },
    },
    dependency: {
      not: [
        "url",
      ],
    },
    options: {
      isServer: false,
      isDev: false,
      basePath: "",
      assetPrefix: "",
    },
  },
]

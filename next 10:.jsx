next 10:

{
  test: /\.(tsx|ts|js|mjs|jsx)$/,
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
  exclude: excludePath=>{if(babelIncludeRegexes.some(r=>r.test(excludePath))){return false;}return /node_modules/.test(excludePath);}},
  use: {
    loader: "next-babel-loader",
    options: {
      configFile: undefined,
      isServer: false,
      distDir: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/.next",
      pagesDir: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/pages",
      cwd: "/Users/Katie/Documents/Sentry/test-apps/next-js-test",
      cache: true,
      development: false,
      hasReactRefresh: false,
      hasJsxRuntime: true,
    },
  },
}

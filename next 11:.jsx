next 11:

{
  test: /\.(tsx|ts|js|mjs|jsx)$/,
  include: [
    "/Users/Katie/Documents/Sentry/test-apps/next-js-test",
    { (regexes)
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
    loader: "/Users/Katie/Documents/Sentry/test-apps/next-js-test/node_modules/next/dist/build/babel/loader/index.js",
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
}

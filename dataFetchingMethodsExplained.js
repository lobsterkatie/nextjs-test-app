const dynamicPage = new Page({
  // lifecycle errors redirect to _error, at which point getInitialProps notes apply
  render: (props) => {},

  // for browser pages besides _error, better than getInitialProps because shared data can be fetched once for all clients, cached for refresh requests from browser
  getServerSideProps: () => {
    // not called during build
    // server gets data for initial render first time page is requested by browser
    // browser gets server to get data for all refreshes
    // code not in browser bundle
    // same as getProps(viaServer = true, refresh = true)
  },

  // for browser _error, not worse than getServerSideProps because there is no shared data and there are no refreshes
  // for browser _error, better than getServerSideProps because no server data is needed - the error is on the front end
  getInitialProps: (err?, ...otherContext) => {
    // server gets data if it's a pageload request
    // browser gets data for client-side navigations
    // code included in browser bundle
    // same as getProps(viaServer = false, refresh = true)
  },
});

const staticPage = new Page({
  // lifecycle errors only happen in build, because react only happens in build (at runtime this is html)
  render: (props) => {},

  //
  getStaticProps: () => {
    // server gets data, browser doesn't call it
    // called at build time, at runtime for refreshes or dynamic routes on first request to paths not returned from getStaticPaths
    // code not in browser bundle
    // same as getProps(viaServer = true, refresh = false)
  },

  // dumb in static page because it forces refreshing
  // dumb in static page because it includes code in browser bundle
  getInitialProps: (err?, ...otherContext) => {
    // server gets data for initial
    // browser gets data for all refreshes
    // code included in browser bundle
    // same as getProps(viaServer = false, refresh = true)
  },
});

import 'nprogress/nprogress.css';
import 'css/tailwind.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';
import React, { useEffect } from 'react';

const useAppProgressBar = () => {
  useEffect(() => {
    let cancelled = false;

    import('nprogress').then(NProgress => {
      if (cancelled) return;

      NProgress.configure({ showSpinner: false });

      Router.events.on('routeChangeStart', NProgress.start);
      Router.events.on('routeChangeComplete', NProgress.done);
      Router.events.on('routeChangeError', NProgress.done);
    });

    return () => {
      cancelled = true;
    };
  }, []);
};

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  useAppProgressBar();

  return (
    <>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimal-ui"
        />
        <link key="font-inter" rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link key="favicon" rel="shortcut icon" href="data:image" />
        <title key="title">Fictief</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default App;

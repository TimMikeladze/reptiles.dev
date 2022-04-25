import '../themes/global.css';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { NextUIProvider } from '@nextui-org/react';
import { darkTheme, lightTheme } from '@/themes';
import Script from 'next/script';
import isBrowser from '@/util/isBrowser';
import Head from 'next/head';
import getAppUrl from '@/util/getAppUrl';
import { NextSeo } from 'next-seo';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from '@/util/constants';
import { useEffect } from 'react';
import { install } from 'ga-gtag';
import gaEnabled from '@/util/gaEnabled';

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    install(gaEnabled ? process.env.NEXT_PUBLIC_GA_ID : undefined, {
      transport_type: `beacon`,
    });
  }, []);
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <NextSeo
        title={SITE_TITLE}
        description={SITE_DESCRIPTION}
        canonical={getAppUrl()}
        openGraph={{
          site_name: SITE_NAME,
          url: getAppUrl(),
          title: SITE_TITLE,
          description: SITE_DESCRIPTION,
        }}
      />
      <NextThemesProvider
        defaultTheme="dark"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </NextThemesProvider>
    </>
  );
}

export default MyApp;

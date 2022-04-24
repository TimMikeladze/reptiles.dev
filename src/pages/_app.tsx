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

const gaEnabled =
  isBrowser() &&
  process.env.NEXT_PUBLIC_GA_ID &&
  process.env.NEXT_PUBLIC_GA_ID.length > 0;

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <NextSeo
        title={SITE_TITLE}
        description={``}
        canonical={getAppUrl()}
        openGraph={{
          site_name: SITE_NAME,
          url: getAppUrl(),
          title: SITE_TITLE,
          description: SITE_DESCRIPTION,
        }}
      />
      {gaEnabled && (
        <Script
          strategy="afterInteractive"
          src={
            `https://www.googletagmanager.com/gtag/js?id=` +
            process.env.NEXT_PUBLIC_GA_ID
          }
          onLoad={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line prefer-rest-params
              dataLayer.push(arguments);
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            gtag(`js`, new Date());

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            gtag(`config`, process.env.NEXT_PUBLIC_GA_ID);
          }}
        />
      )}
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

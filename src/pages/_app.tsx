import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react';
import { darkTheme, lightTheme } from '@/themes';

function MyApp({ Component, pageProps }: any) {
  return (
    // 2. Use at the root of your app
    <NextThemesProvider
      defaultTheme="system"
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
  );
}

export default MyApp;

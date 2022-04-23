import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const lightTheme = createTheme({
  type: `light`,
  theme: {
    colors: {
      primary: `#4ADE7B`,
    },
  },
});

export const darkTheme = createTheme({
  type: `dark`,
  theme: {
    colors: {
      primary: `#4ADE7B`,
    },
  },
});

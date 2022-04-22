import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const lightTheme = createTheme({
  type: `light`,
  theme: {},
});

export const darkTheme = createTheme({
  type: `dark`,
  theme: {},
});

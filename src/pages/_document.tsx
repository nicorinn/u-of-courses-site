import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react';

const theme: ThemeConfig = extendTheme({
  fonts: {
    body: 'IBM Plex Sans, sans-serif',
    heading: 'IBM Plex Sans, sans-serif',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

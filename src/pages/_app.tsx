import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import {
  Box,
  Center,
  ChakraProvider,
  extendTheme,
  ThemeConfig,
} from '@chakra-ui/react';
import { Header } from '../components/header';
import * as ga from '../lib/ga';
import { useEffect } from 'react';

const theme: ThemeConfig = extendTheme({
  fonts: {
    body: 'Epilogue, sans-serif',
    heading: 'Epilogue, sans-serif',
  },
  colors: {
    maroon: '#800000',
  },
});

const handleRouteChange = (url: string) => ga.pageView(url);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Subscribe to router changes and log page views to GA
    router.events.on('routeChangeComplete', handleRouteChange);
    // Unsubscribe when component is unmounted
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Box mt={10} mb={20}>
        <Component {...pageProps} />
      </Box>
      <Box margin="auto" bottom={0} p={5} width="100%" bg="#fff">
        <Center>&copy; u of courses 2022</Center>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;

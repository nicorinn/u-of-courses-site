import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import {
  Box,
  Center,
  ChakraProvider,
  extendTheme,
  Link,
  ThemeConfig,
} from '@chakra-ui/react';
import { Header } from '../components/header';
import * as ga from '../lib/ga';
import { useEffect, useState } from 'react';
import { MaintenanceModal, NoticeModal } from '../components/noticeModal';

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
  const [newVisitor, setNewVisitor] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Subscribe to router changes and log page views to GA
    router.events.on('routeChangeComplete', handleRouteChange);
    // Unsubscribe when component is unmounted
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setNewVisitor(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === 'true';
  const href =
    'https://docs.google.com/forms/d/e/1FAIpQLScfut9vZD2GkcuMJKORlnV4bccFXiToN1TrQk9pxLHLBBSzmA/viewform?usp=pp_url&entry.1259737458=' +
    'https://uofcourses.com' +
    router.asPath;

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Box mt={10} mb={20}>
        {newVisitor && <NoticeModal />}
        {isMaintenance && <MaintenanceModal />}
        <Component {...pageProps} />
      </Box>
      <Box margin="auto" bottom={0} p={5} width="100%" bg="#fff">
        <Center mb={3}>
          <Link href={href} color="maroon" isExternal>
            report issue
          </Link>
        </Center>
        <Center>&copy; u of courses 2022</Center>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  Box,
  Center,
  ChakraProvider,
  extendTheme,
  ThemeConfig,
} from '@chakra-ui/react';
import { Header } from '../components/header';

const theme: ThemeConfig = extendTheme({
  fonts: {
    body: 'Epilogue, sans-serif',
    heading: 'Epilogue, sans-serif',
  },
  colors: {
    maroon: '#800000',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
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

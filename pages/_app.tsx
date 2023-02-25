import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import SiteNavigation from '../components/SiteNavigation';
import '../styles/styles.css';
import theme from './theme';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <SiteNavigation />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

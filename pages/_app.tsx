import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import SiteNavigation from '../components/SiteNavigation';
import '../styles/styles.css';
import theme from '../theme';
import { SessionProvider } from 'next-auth/react';
export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
            <SiteNavigation />
            <Component {...pageProps} />
        </ChakraProvider>
        </SessionProvider>
    );
}

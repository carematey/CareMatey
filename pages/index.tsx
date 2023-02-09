import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import FullButton from '../components/FullButton';
import { Box, Stack, Wrap, SimpleGrid } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <Box>
                <SimpleGrid column={2} minChildWidth={'50%'}>
                    <FullButton
                        bgColor={'brand.blue'}
                        // topText='plant'
                        // bottomText='BotHome'
                        icon="plant"
                        href="/plant"
                    />
                    <FullButton
                        bgColor={'brand.blue'}
                        topText="Dog House"
                        bottomText="Enter if you dare"
                        icon="dog"
                        href="/pets"
                    />
                    <FullButton
                        bgColor={'brand.pink'}
                        bottomText="Home"
                        icon="house"
                        href="/house"
                    />
                </SimpleGrid>
            </Box>
        </>
    );
}

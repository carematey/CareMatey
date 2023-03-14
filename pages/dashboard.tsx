import { Sidebar } from './../components/sidebar';
import {
    Container,
    Divider,
    Text,
    Stack,
    CircularProgress,
    VStack,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import InfoCardCollection from '../components/InfoCardCollection';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { useSession } from 'next-auth/react';
import { Space } from '@prisma/client';
import Categories from '../components/Categories';

const Space = () => {
    const { data: session } = useSession();
    const [selectedSpaceId, setSelectedSpaceId] = React.useState<number | null>(
        null
    );

    const {
        data: spaces,
        error,
        isLoading,
    } = useSWR(
        session?.user && `/api/spaces/user/${session?.user?.id}`,
        fetcher
    );

    const selectedSpace: Space = useMemo(
        () =>
            spaces &&
            spaces.find((space: Space) => space.id === selectedSpaceId),
        [selectedSpaceId, spaces]
    );

    return (
        <Container pt={'5rem'} h={'100vh'} maxW={'100%'} bg={'gray.50'}>
            {session ? (
                <>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        width={'100%'}
                        height={{ md: '100%' }}
                    >
                        {isLoading ? (
                            <>
                                <CircularProgress
                                    margin={'auto'}
                                    pt={'30vh'}
                                    justifySelf={'center'}
                                    alignSelf={'center'}
                                    isIndeterminate
                                />
                            </>
                        ) : (
                            <>
                                <Categories spaceId={selectedSpaceId} />
                                <Divider
                                    display={{
                                        base: 'none',
                                        md: 'block',
                                    }}
                                    orientation="vertical"
                                    borderColor={'whiteAlpha.'}
                                    h={'calc(min(750px, calc(100vh - 4rem)))'}
                                />
                                <VStack w={'100%'} alignItems={'center'}>
                                    <Sidebar
                                        selectedSpaceId={selectedSpaceId}
                                        setSelectedSpaceId={setSelectedSpaceId}
                                        selectedSpace={selectedSpace}
                                    />
                                    {selectedSpaceId && (
                                        <InfoCardCollection
                                            spaceName={selectedSpace?.name}
                                            spaceId={selectedSpaceId}
                                        />
                                    )}
                                </VStack>
                            </>
                        )}
                    </Stack>
                </>
            ) : (
                <Text>Please login</Text>
            )}
        </Container>
    );
};

export default Space;

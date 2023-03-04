import { Sidebar } from './../components/sidebar';
import {
    Container,
    Divider,
    Text,
    Stack,
    CircularProgress,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import InfoCardCollection from '../components/InfoCardCollection';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { useSession } from 'next-auth/react';
import { Space } from '@prisma/client';

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
        <Container h={'100%'} maxW={'100%'}>
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
                                <Sidebar
                                    selectedSpaceId={selectedSpaceId}
                                    setSelectedSpaceId={setSelectedSpaceId}
                                    selectedSpace={selectedSpace}
                                />
                                <Divider
                                    display={{ base: 'none', md: 'block' }}
                                    orientation="vertical"
                                    borderColor={'whiteAlpha.'}
                                    h={'calc(min(750px, calc(100vh - 4rem)))'}
                                />
                                {selectedSpaceId && (
                                    <InfoCardCollection
                                        spaceName={selectedSpace?.name}
                                        spaceId={selectedSpaceId}
                                    />
                                )}
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

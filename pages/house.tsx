import { Container, Text } from '@chakra-ui/react';
import React from 'react';
import InfoCardCollection from '../components/InfoCardCollection';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { useSession } from 'next-auth/react';

//@temporary:
const spaceId = 1

const Space = (selectedSpace: Number) => {
    const { data: session } = useSession();
    const { data: loadedSpace, error, isLoading } = useSWR(
        session?.user && `/api/cards/space/${spaceId}`,
        fetcher
    );
    return (
        <Container>
            {session ? <>
            <Text>Welcome {session.user?.email}</Text>
                <InfoCardCollection data={loadedSpace} isLoading={isLoading} /> 
            </>
            :<Text>Please login</Text> }
        </Container>
    );
};

export default Space;

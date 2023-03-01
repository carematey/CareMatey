import { Container, Text } from '@chakra-ui/react';
import React from 'react';
import InfoCardCollection from '../components/InfoCardCollection';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { useSession } from 'next-auth/react';

const House = () => {
    const { data: session } = useSession();
    const { data, error, isLoading } = useSWR(
        session?.user && `/api/spaces/${session.user.id}`,
        fetcher
    );
    return (
        <Container>
            {session && <Text>Welcome {session.user?.email}</Text>}
            <InfoCardCollection data={data} isLoading={isLoading} />
        </Container>
    );
};

export default House;

import { Container, Text } from '@chakra-ui/react';
import React from 'react';
import InfoCardCollection from '../components/InfoCardCollection';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { useSession } from 'next-auth/react';

const House = () => {
    const { data: session } = useSession();

    const {
        data: user,
        error: userError,
        isLoading: isUserLoading,
    } = useSWR(session && `/api/users/${session?.user?.email}`, fetcher);
    const { data, error, isLoading } = useSWR(
        user && `/api/homes/${user?.id}`,
        fetcher
    );

    return (
        <Container>
            {session && <Text>Welcome {user?.email}</Text>}
            <InfoCardCollection data={data} isLoading={isLoading} />
        </Container>
    );
};

export default House;

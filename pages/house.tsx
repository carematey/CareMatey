import { Container } from '@chakra-ui/react';
import React from 'react';
import InfoCardCollection from '../components/InfoCardCollection';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

//
const homeId = 2;

const House = () => {
    const { data, error, isLoading } = useSWR(`/api/cards/${homeId}`, fetcher);

    return (
        <Container>
            <InfoCardCollection data={data} isLoading={isLoading} />
        </Container>
    );
};

export default House;

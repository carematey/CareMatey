import { SimpleGrid, Button, Text, Container } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { fetcher } from '../utils/fetcher';
import useSWR from 'swr';
import InfoCardCollection from '../components/InfoCardCollection';

const House = () => {
    const {
        data: house, // change data variable to house
        isLoading,
        error,
    } = useSWR(`/api/house/${123}`, fetcher);

    return (
        <Container m={3}>
            <InfoCardCollection dataSource={'house'} />
        </Container>
    );
};

export default House;

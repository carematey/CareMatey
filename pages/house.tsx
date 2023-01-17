import { Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { fetcher } from '../utils/fetcher';
import useSWR from 'swr';

const House = () => {
    const {
        data: house, // change data variable to house
        isLoading,
        error,
    } = useSWR(`/api/house/${123}`, fetcher);

    return (
        <div>
            {house && (
                <>
                    {' '}
                    <Text>{house.emergencyContact?.name}</Text>
                    <Text>{house.address?.street}</Text>
                </>
            )}
        </div>
    );
};

export default House;

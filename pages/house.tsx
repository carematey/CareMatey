import { SimpleGrid, Button, Text, Container } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import InfoCardCollection from '../components/InfoCardCollection';

const House = () => {
    const [house, setHouse] = React.useState<any>();

    useEffect(() => {
        async function getHouse(uuid: string) {
            const res = await fetch(`/api/house/${uuid}`);
            const data = await res.json();

            return data;
        }
        const house = getHouse('123');
        house.then((data) => setHouse(data));

        return () => {};
    }, []);

    return (
        <Container m={3}>
            <InfoCardCollection dataSource={'house'} />
        </Container>
    );
};

export default House;

import { Container } from '@chakra-ui/react';
import React from 'react';
import InfoCardCollection from '../components/InfoCardCollection';

const House = () => {
    return (
        <Container>
            <InfoCardCollection dataSource={'house'} uuid={1} />
        </Container>
    );
};

export default House;

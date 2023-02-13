import { Container, PopoverHeader, useMediaQuery } from '@chakra-ui/react';
import React, { useState } from 'react';
import InfoCardCollection from '../components/InfoCardCollection';
import SiteNavigation from '../components/SiteNavigation';

const House = () => {
    const [isLargerThan480px] = useMediaQuery('(max-width: 480px)');

    return (
        <Container>
            <SiteNavigation size={isLargerThan480px} />
            <InfoCardCollection
                marginTop={isLargerThan480px ? 3 : 16}
                dataSource={'house'}
                uuid={1}
            />
        </Container>
    );
};

export default House;

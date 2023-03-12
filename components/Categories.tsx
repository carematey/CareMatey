import { Box, SimpleGrid, Square, Text } from '@chakra-ui/react';
import React from 'react';
import CategoryIcon from './CategoryIcon';

type Props = {};

const categoryNames = [
    'CJ',
    'Scout',
    'Emergency Contact',
    'Wifi',
    'Emergency Contact',
    'Wifi',
    'CJ',
    'Scout',
    'Emergency Contact',
    'Wifi',
    'Emergency Contact',
    'Wifi',
    'Emergency Contact',
    'Wifi',
    'CJ',
    'Scout',
    'Emergency Contact',
    'Wifi',
    'Emergency Contact',
    'Wifi',
    'CJ',
    'Scout',
    'Emergency Contact',
    'Wifi',
    'Emergency Contact',
    'Wifi',
    'CJ',
    'Scout',
    'Emergency Contact',
    'Wifi',
    'Emergency Contact',
    'Wifi',
    'Emergency Contact',
    'Wifi',
    'CJ',
    'Scout',
    'Emergency Contact',
    'Wifi',
    'Emergency Contact',
    'Wifi',
];

export default function Categories({ ...rest }: Props) {
    return (
        <Box
            {...rest}
            overflowY={'scroll'}
            overflowX={'hidden'}
            maxHeight={{ base: '12rem', md: '100vh' }}
            width={{ base: '100%', md: '100px' }}
        >
            <SimpleGrid
                columns={{
                    base: 3,
                    sm: 5,
                    md: 1,
                }}
                rowGap={2}
                justifyItems={'center'}
            >
                {categoryNames.map((categoryName) => {
                    return (
                        <CategoryIcon
                            key={categoryName}
                            categoryName={categoryName}
                        />
                    );
                })}
            </SimpleGrid>
        </Box>
    );
}

import { Box, SimpleGrid, Square, Text } from '@chakra-ui/react';
import React from 'react';
import CategoryIcon from './CategoryIcon';

type Props = {};

const names = [
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
            maxH={{ base: '12rem', md: '100vh' }}
            overflowY={'scroll'}
        >
            <SimpleGrid
                columns={{
                    base: 3,
                    sm: 5,
                    md: 2,
                }}
                rowGap={2}
                justifyItems={'center'}
            >
                {names.map((name) => {
                    return <CategoryIcon key={name} categoryName={name} />;
                })}
            </SimpleGrid>
        </Box>
    );
}

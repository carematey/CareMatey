import { Box, Wrap, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import CategoryIcon from './CategoryIcon';

type Props = { spaceId: number | null };

export default function Categories({ spaceId, ...rest }: Props) {
    const {
        data: categories,
        error: errorCategories,
        isLoading: isLoading,
    } = useSWR(!!spaceId && `/api/spaces/${spaceId}/categories`, fetcher);

    return (
        <Box
            position={'sticky'}
            top={0}
            {...rest}
            overflowY={'scroll'}
            maxHeight={{ base: '8rem', md: '100vh' }}
            width={{ base: '100%', md: '5.5rem' }}
        >
            <Wrap
                spacing={{ base: 1, md: 3 }}
                justify={'center'}
                shouldWrapChildren
            >
                {categories?.map((category: any) => {
                    return (
                        <VStack key={category.id}>
                            <CategoryIcon
                                categoryName={category.name}
                                src={category.name}
                                category={category.name}
                                categoryId={category.id}
                            />
                            <Text
                                casing={'capitalize'}
                                wordBreak={'break-word'}
                            >
                                {category.name}
                            </Text>
                        </VStack>
                    );
                })}
            </Wrap>
        </Box>
    );
}

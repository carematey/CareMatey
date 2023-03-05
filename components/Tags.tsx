import { Wrap, WrapItem, Tag } from '@chakra-ui/react';
import React from 'react';
export default function Tags({
    tagSize,
    tags,
}: {
    tagSize: string;
    tags: string[] | undefined;
}) {
    return (
        <Wrap spacing={2} m={0} p={0} pt={4} alignSelf={'flex-start'}>
            {tags?.map((tag: string, index: number) => (
                <WrapItem key={index}>
                    <Tag
                        p={1}
                        textOverflow={'ellipsis'}
                        whiteSpace={'nowrap'}
                        overflow={'hidden'}
                        size={tagSize}
                        colorScheme={'blue'}
                    >
                        {tag.toString().toLowerCase()}
                    </Tag>
                </WrapItem>
            ))}
        </Wrap>
    );
}

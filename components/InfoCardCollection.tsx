import {
    ChakraProps,
    CircularProgress,
    SimpleGrid,
    Center,
    Button,
    VStack,
    HStack,
} from '@chakra-ui/react';
import InfoCard from './InfoCard';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
/*
    dataSource is used to define where the data is coming from.
    Then we fill the InfoCardCollection with all the InfoCards
    that exists from the defined dataSource
    Run the API here and then use the response to create InfoCard
    Components
*/

interface InfoCardCollectionProps extends ChakraProps {
    text?: string;
    title?: string;
    id?: string;
    tags?: any;
    index?: number;
    lastUpdated?: string | undefined;
    createdAt?: string;
    spaceId?: number;
}

const InfoCardCollection: React.FC<InfoCardCollectionProps> = (
    props
): JSX.Element => {
    const { spaceId, ...rest } = props;
    const {
        data,
        error: errorCards,
        isLoading: isLoading,
        mutate,
    } = useSWR(!!spaceId && `/api/cards/space/${spaceId}`, fetcher);
    const [selectedTags, setSelectedTags] = useState('');
    const handleClickTags = (tags: string) => {
        if (selectedTags === tags) {
            setSelectedTags('');
        } else {
            setSelectedTags(tags);
        }
    };

    const tagSet = new Set(
        data?.map((item: InfoCardCollectionProps) => item.tags).flat()
    );

    useEffect(() => {
        setSelectedTags('');
    }, [spaceId]);

    // filter of all items for the InfoCard component
    let filteredItems = data?.filter((item: InfoCardCollectionProps) => {
        if (!selectedTags) {
            return item;
        } else {
            return item.tags?.includes(selectedTags);
        }
    });

    // Pull this from the DB
    // const homeName: string = data.space.name;

    return (
        <>
            {isLoading ? (
                <Center>
                    <CircularProgress isIndeterminate />
                </Center>
            ) : (
                <>
                    <Center mt={4}>
                        {/* <Heading>{homeName}</Heading> */}
                    </Center>
                    <VStack w={'100%'} h={'calc(min(750px, 100vh) - 4rem)'}>
                        <HStack
                            flexDir={'row-reverse'}
                            pos={'sticky'}
                            top={'0'}
                        >
                            {Array.from(tagSet)?.map((tag, index) => {
                                return (
                                    <Button
                                        key={index}
                                        h={'20'}
                                        mx={1}
                                        onClick={() =>
                                            handleClickTags(tag as string)
                                        }
                                        bg={
                                            selectedTags ===
                                            (tag as string).toLocaleLowerCase()
                                                ? 'blackAlpha.500'
                                                : 'gray.100'
                                        }
                                        color={
                                            selectedTags ===
                                            (tag as string).toLocaleLowerCase()
                                                ? 'white'
                                                : 'black'
                                        }
                                        outlineColor={
                                            selectedTags ===
                                            (tag as string).toLocaleLowerCase()
                                                ? 'whiteAlpha.700'
                                                : ''
                                        }
                                        whiteSpace={'normal'}
                                    >
                                        {tag?.toString()?.toUpperCase()}
                                    </Button>
                                );
                            })}
                            <Button
                                key={0}
                                h={'20'}
                                onClick={() => handleClickTags('')}
                            >
                                CLEAR FILTER
                            </Button>
                        </HStack>
                        <SimpleGrid minChildWidth={'12rem'} spacing={3}>
                            {filteredItems?.map(
                                (content: InfoCardCollectionProps) => {
                                    return (
                                        <>
                                            <InfoCard
                                                key={content.id}
                                                tags={content.tags}
                                                title={content.title}
                                                text={content.text}
                                                toCreate={false}
                                                date={
                                                    content.lastUpdated
                                                        ? new Date(
                                                              content.lastUpdated
                                                          )
                                                        : new Date(
                                                              content.createdAt as string
                                                          )
                                                }
                                            />
                                        </>
                                    );
                                }
                            )}
                            <InfoCard
                                mutate={mutate}
                                spaceId={spaceId}
                                toCreate
                            />
                        </SimpleGrid>
                    </VStack>
                </>
            )}
        </>
    );
};

export default InfoCardCollection;

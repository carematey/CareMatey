import {
    ChakraProps,
    CircularProgress,
    SimpleGrid,
    Container,
    Center,
    Button,
} from '@chakra-ui/react';
import InfoCard from './InfoCard';
import React, { useState } from 'react';
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
    category?: string;
    uuid?: number;
    dataSource: string;
    content?: string[];
}

const InfoCardCollection: React.FC<InfoCardCollectionProps> = (
    props
): JSX.Element => {
    const { text, title, tags, category, uuid, dataSource, ...rest } = props;

    const { data, error, isLoading } = useSWR(
        `/api/${dataSource}/${uuid}`,
        fetcher
    );
    const [selectedTags, setSelectedTags] = useState('');
    const handleClickTags = (tags: string) => {
        if (selectedTags === tags) {
            setSelectedTags('');
        } else {
            setSelectedTags(tags);
        }
    };

    // filter of all items for the InfoCard component
    let filteredItems = data?.userContent.filter(
        (item: InfoCardCollectionProps) => {
            if (!selectedTags) {
                return item;
            } else {
                return item.tags?.includes(selectedTags);
            }
        }
    );

    const filteredCategories: any = data?.userContent.map(
        (component: InfoCardCollectionProps) => {
            return component.tags.map((item: string) => {
                return item.toString();
            });
        }
    );
    const uniqueCategories: any = [
        ...new Set(
            filteredCategories?.flat().sort((a: number, b: number) => a - b)
        ),
    ];

    return (
        <>
            {isLoading ? (
                <Center>
                    <CircularProgress isIndeterminate />
                </Center>
            ) : (
                <>
                    <SimpleGrid
                        minChildWidth={'6rem'}
                        spacing={3}
                        pb={6}
                        {...rest}
                    >
                        {uniqueCategories?.map((tags: any, id: number) => {
                            return (
                                <Button
                                    key={id}
                                    h={'20'}
                                    onClick={() => handleClickTags(tags)}
                                    bg={
                                        selectedTags === tags
                                            ? 'white'
                                            : 'whiteAlpha.500'
                                    }
                                    outlineColor={
                                        selectedTags === tags
                                            ? 'whiteAlpha.700'
                                            : ''
                                    }
                                    whiteSpace={'normal'}
                                >
                                    {tags.toUpperCase()}
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
                    </SimpleGrid>
                    <SimpleGrid minChildWidth={'12rem'} spacing={3}>
                        {filteredItems.map(
                            (content: InfoCardCollectionProps) => {
                                return (
                                    <InfoCard
                                        key={content.id}
                                        tags={content.tags}
                                        title={content.title}
                                        text={content.text}
                                    />
                                );
                            }
                        )}
                    </SimpleGrid>
                </>
            )}
        </>
    );
};

export default InfoCardCollection;

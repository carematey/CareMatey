import {
    ChakraProps,
    CircularProgress,
    SimpleGrid,
    Center,
    Button,
    Heading,
} from '@chakra-ui/react';
import InfoCard from './InfoCard';
import React, { useState } from 'react';

/*
    dataSource is used to define where the data is coming from.
    Then we fill the InfoCardCollection with all the InfoCards
    that exists from the defined dataSource
    Run the API here and then use the response to create InfoCard
    Components
*/

interface InfoCardCollectionProps extends ChakraProps {
    data?: any;
    isLoading: boolean;
    text?: string;
    title?: string;
    id?: string;
    tags?: any;
    index?: number;
    lastUpdated?: string | undefined;
    createdAt?: string;
}

const InfoCardCollection: React.FC<InfoCardCollectionProps> = (
    props
): JSX.Element => {
    const { data, isLoading, ...rest } = props;

    const [selectedTags, setSelectedTags] = useState('');
    const handleClickTags = (tags: string) => {
        if (selectedTags === tags) {
            setSelectedTags('');
        } else {
            setSelectedTags(tags);
        }
    };

    // filter of all items for the InfoCard component
    let filteredItems = data?.filter((item: InfoCardCollectionProps) => {
        if (!selectedTags) {
            return item;
        } else {
            return item.tags?.includes(selectedTags);
        }
    });

    const filteredCategories: any = data?.map(
        (component: InfoCardCollectionProps) => {
            return component.tags?.map((item: string) => {
                return item.toString();
            });
        }
    );
    const uniqueCategories: any = [
        ...new Set(
            filteredCategories?.flat().sort((a: number, b: number) => a - b)
        ),
    ];

    // Pull this from the DB
    const homeName: string = 'Mikeys house';

    return (
        <>
            {isLoading ? (
                <Center>
                    <CircularProgress isIndeterminate />
                </Center>
            ) : (
                <>
                    <Center mt={4}>
                        <Heading>{homeName}</Heading>
                    </Center>
                    <SimpleGrid
                        minChildWidth={'6rem'}
                        spacing={3}
                        pb={6}
                        {...rest}
                    >
                        {uniqueCategories?.map(
                            (tags: any, id: string, index: number) => {
                                return (
                                    <Button
                                        key={index}
                                        id={id}
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
                            }
                        )}
                        <Button
                            key={0}
                            h={'20'}
                            onClick={() => handleClickTags('')}
                        >
                            CLEAR FILTER
                        </Button>
                    </SimpleGrid>
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
                                            date={
                                                content.lastUpdated
                                                    ? content.lastUpdated
                                                    : content.createdAt
                                            }
                                        />
                                    </>
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

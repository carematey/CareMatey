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
    category?: any;
    uuid?: number;
    dataSource: string;
    content?: string[];
}

const InfoCardCollection: React.FC<InfoCardCollectionProps> = (
    props
): JSX.Element => {
    const { text, title, category, uuid, dataSource, ...rest } = props;

    const { data, error, isLoading } = useSWR(
        `/api/${dataSource}/${uuid}`,
        fetcher
    );
    const [filteredCards, setFilteredCards] = useState<string>('');

    // filter of all items for the InfoCard component
    let filteredItems = data?.userContent.filter(
        (item: InfoCardCollectionProps) => {
            if (!filteredCards) {
                return item;
            } else {
                return item.category?.includes(filteredCards);
            }
        }
    );

    const filteredCategories: any = data?.userContent.map(
        (component: InfoCardCollectionProps) => {
            return component.category.map((item: string) => {
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
                <Container>
                    <SimpleGrid minChildWidth={'6rem'} spacing={3}>
                        {uniqueCategories?.map((content: any, id: number) => {
                            return (
                                <Button
                                    key={id}
                                    h={'20'}
                                    onClick={() =>
                                        content.category &&
                                        setFilteredCards(content.category[0])
                                    }
                                >
                                    {content}
                                </Button>
                            );
                        })}
                    </SimpleGrid>
                    <SimpleGrid minChildWidth={'12rem'} spacing={3}>
                        {filteredItems.map(
                            (content: InfoCardCollectionProps) => {
                                return (
                                    <InfoCard
                                        key={content.id}
                                        category={content.category}
                                        title={content.title}
                                        text={content.text}
                                    />
                                );
                            }
                        )}
                    </SimpleGrid>
                </Container>
            )}
        </>
    );
};

export default InfoCardCollection;

import {
    ChakraProps,
    CircularProgress,
    SimpleGrid,
    Container,
    Center,
} from '@chakra-ui/react';
import InfoCard from './InfoCard';
import React, { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import InfoFilterButtons from './InfoFilterButtons';

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
    category?: string;
    uuid?: number;
    dataSource: string;
}

const InfoCardCollection: React.FC<InfoCardCollectionProps> = (
    props
): JSX.Element => {
    const { text, title, category, uuid, dataSource, ...rest } = props;

    const { data, error, isLoading } = useSWR(
        `/api/${dataSource}/${uuid}`,
        fetcher
    );
    const [filter, setFilter] = useState('');

    // filter of all items for the InfoCard component
    let filteredItems = data?.userContent.filter(
        (item: InfoCardCollectionProps) => {
            if (!filter) {
                return item;
            } else {
                return item.category?.includes(filter);
            }
        }
    );

    // get the categories of the data to make category filter cards. Not working yet @todo
    let filteredCategories = data?.userContent.filter(
        (component: InfoCardCollectionProps, index: number) => {
            return data?.userContent.indexOf(component.category) === index;
        }
    );

    return (
        <>
            {isLoading ? (
                <Center>
                    <CircularProgress isIndeterminate />
                </Center>
            ) : (
                <Container>
                    <SimpleGrid minChildWidth={'6rem'} spacing={3}>
                        {filteredItems.map(
                            (content: InfoCardCollectionProps) => {
                                return (
                                    <InfoFilterButtons
                                        key={'12'}
                                        category={content.category}
                                        h={'20'}
                                    />
                                );
                            }
                        )}
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

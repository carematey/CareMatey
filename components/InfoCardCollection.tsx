import {
    ChakraProps,
    CircularProgress,
    SimpleGrid,
    Container,
    Button,
    Text,
    Center,
} from '@chakra-ui/react';
import InfoCard from './InfoCard';
import React, { useEffect } from 'react';
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

    return (
        <>
            {isLoading ? (
                <Center>
                    <CircularProgress isIndeterminate />
                </Center>
            ) : (
                <Container>
                    <SimpleGrid minChildWidth={'12rem'} spacing={3}>
                        {/* Make a component of this based on the values of the buttons inside of it.
                        Do a repeat of buttons based on the category titles. 
                    Button cause filters do filter the category content. */}
                        <Button h={20}>
                            <Text>Category name</Text>
                        </Button>
                    </SimpleGrid>
                    <SimpleGrid minChildWidth={'12rem'} spacing={3}>
                        {data.userContent.map(
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

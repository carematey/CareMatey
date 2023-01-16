import {
    ChakraProps,
    CircularProgress,
    SimpleGrid,
    Container,
    Button,
    Text,
} from '@chakra-ui/react';
import InfoCard from './InfoCard';
import React, { useEffect } from 'react';

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
    dataSource: string;
}

const InfoCardCollection: React.FC<InfoCardCollectionProps> = (
    props
): JSX.Element => {
    const { text, title, category, dataSource, ...rest } = props;
    const [response, setResponse] = React.useState<any>();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    useEffect(() => {
        async function getResponse(uuid: string) {
            const res = await fetch(`/api/${dataSource}/${uuid}`);
            const data = await res.json();
            setResponse(data);
            setIsLoading(false);
        }
        const categories = [];
        // make an array of the categories returned in the response to build the filte buttons
        // response.userContent.map((content) => {
        //     categories.push(content.cateogry);
        // });
        getResponse('123');

        return () => {};
    }, [dataSource]);

    return (
        <>
            {isLoading ? (
                <CircularProgress isIndeterminate />
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
                        {response.userContent.map(
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

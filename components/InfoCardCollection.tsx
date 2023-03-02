import {
    ChakraProps,
    CircularProgress,
    SimpleGrid,
    Center,
    Button,
    VStack,
    HStack,
    Card,
    Heading,
    Text,
    ButtonGroup,
    Divider,
} from '@chakra-ui/react';
import InfoCard from './InfoCard';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import theme from '../theme';
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
    spaceName?: string;
    spaceId?: number;
}

const InfoCardCollection: React.FC<InfoCardCollectionProps> = (
    props
): JSX.Element => {
    const { spaceId, spaceName, ...rest } = props;
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

    const [recommendations, setRecommendations] = useState([]);

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
                                        onClick={() =>
                                            handleClickTags(tag as string)
                                        }
                                        bg={
                                            selectedTags.toLocaleLowerCase() ===
                                            (tag as string).toLocaleLowerCase()
                                                ? 'white'
                                                : 'whiteAlpha.500'
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
                                setRecommendations={setRecommendations}
                                recommendations={recommendations}
                                mutate={mutate}
                                spaceId={spaceId}
                                spaceName={spaceName}
                                toCreate
                            />
                        </SimpleGrid>
                        <Divider
                            orientation="horizontal"
                            borderColor={'black'}
                        />
                        <SimpleGrid minChildWidth="10rem" spacing={4}>
                            {recommendations?.length > 0 &&
                                typeof recommendations !== 'string' &&
                                recommendations?.map((recommendation: any) => (
                                    <VStack>
                                        <Card
                                            p={4}
                                            {...rest}
                                            bg={'white'}
                                            rounded={'md'}
                                            boxShadow={'inner'}
                                            cursor={'pointer'}
                                        >
                                            <Card>
                                                <Heading
                                                    color={
                                                        theme.colors.brand.blue
                                                            .dark
                                                    }
                                                >
                                                    {recommendation?.title}
                                                </Heading>
                                                <Text
                                                    color={
                                                        theme.colors.brand.blue
                                                            .main
                                                    }
                                                >
                                                    {/* {text} */}
                                                    {recommendation?.text !=
                                                        undefined &&
                                                    recommendation?.text
                                                        .length > 90
                                                        ? recommendation?.text.slice(
                                                              0,
                                                              90
                                                          ) + '...'
                                                        : recommendation?.text}
                                                </Text>
                                            </Card>
                                        </Card>
                                        <ButtonGroup>
                                            {/* save and cancel buttons */}
                                            <Button colorScheme="blue">
                                                Save
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    setRecommendations(
                                                        recommendations.filter(
                                                            (rec: any) =>
                                                                rec.title !==
                                                                recommendation.title
                                                        )
                                                    )
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </ButtonGroup>
                                    </VStack>
                                ))}
                        </SimpleGrid>
                    </VStack>
                </>
            )}
        </>
    );
};

export default InfoCardCollection;

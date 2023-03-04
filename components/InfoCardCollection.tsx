import {
    ChakraProps,
    CircularProgress,
    SimpleGrid,
    Center,
    Button,
    VStack,
    Box,
    ButtonGroup,
    Divider,
    Heading,
} from '@chakra-ui/react';
import InfoCard from './InfoCard';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import theme from '../theme';
import { useSession } from 'next-auth/react';
import CreateCard from './CreateCard';
import AiCard from './AiCard';
/*
    dataSource is used to define where the data is coming from.
    Then we fill the InfoCardCollection with all the InfoCards
    that exists from the defined dataSource
    Run the API here and then use the response to create InfoCard
    Components
*/
// const mockData = [
//     {
//         title: 'How to',
//         text: 'The AI is a tool that can help you find',
//         tags: ['AI', 'Tool', 'Resource'],
//     },
//     {
//         title: 'What is the AI',
//         text: 'The AI is a tool that can help you find the best resource/ The AI is a tool that can help you find the best resource',
//         tags: ['AI', 'Tool', 'Resource'],
//     },
//     {
//         // vary the length of the text
//         title: 'How to use the AI sdfgfd dfsg  sdf',
//         text: 'The AI is a tool that can help you find the best resource. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         tags: ['AI', 'Tool', 'Resource'],
//     },
// ];

interface InfoCardCollectionProps extends ChakraProps {
    text?: string;
    title?: string;
    id?: string;
    tags?: any;
    index?: number;
    lastUpdated?: string | undefined;
    createdAt?: string;
    spaceName?: string | null;
    spaceId?: number;
}

const InfoCardCollection: React.FC<InfoCardCollectionProps> = (
    props
): JSX.Element => {
    const { data: session } = useSession();
    const { spaceId, spaceName, ...rest } = props;

    const {
        data: cardData,
        error: errorCards,
        isLoading: isLoading,
        mutate: mutateCards,
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
        cardData?.map((item: InfoCardCollectionProps) => item.tags).flat()
    );

    const [recommendations, setRecommendations] = useState<
        {
            title: string;
            text: string;
            tags: string[];
            lastUpdated?: string;
        }[]
    >([]);

    useEffect(() => {
        setSelectedTags('');
        setRecommendations([]);
    }, [spaceId]);

    const handleSubmission = async (newCardValues: {
        title: string;
        text: string;
        tags: string[];
    }) => {
        const res = await fetch(
            `/api/cards/${spaceId}`, // TODO: change this to the id of the space
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    creatorId: session?.user?.id,
                    ownerId: session?.user?.id,
                    // TODO: change this to the id of the user who owns the board, in case the sitter is creating a card for the owner
                    title: newCardValues.title,
                    text: newCardValues.text,
                    tags: newCardValues.tags,
                }),
            }
        );
        const data = await res.json();

        mutateCards([
            ...cardData,
            {
                creatorId: session?.user?.id,
                ownerId: session?.user?.id,
                title: newCardValues.title,
                text: newCardValues.text,
                tags: newCardValues.tags,
            },
        ]);
    };

    // filter of all items for the InfoCard component
    let filteredItems = cardData?.filter((item: InfoCardCollectionProps) => {
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
                <Box
                    w={'100%'}
                    h={'calc(min(750px, 100vh) - 4rem)'}
                    bg={'whiteAlpha.800'}
                >
                    <VStack w={'100%'}>
                        {Array.from(tagSet).length > 0 && (
                            <SimpleGrid
                                pos={'sticky'}
                                top={'4rem'}
                                zIndex={4}
                                pt={4}
                                boxShadow={'lg'}
                                borderRadius={'lg'}
                                bg={'gray.50'}
                                width={'100%'}
                                minChildWidth={28}
                                maxHeight={32}
                                overflowY={'scroll'}
                            >
                                <Button
                                    key={0}
                                    h={16}
                                    onClick={() => handleClickTags('')}
                                >
                                    CLEAR FILTER
                                </Button>
                                {/* filter tags */}
                                {Array.from(tagSet)?.map(
                                    (tag, index: number) => {
                                        return (
                                            <Button
                                                key={index + 1}
                                                h={16}
                                                onClick={() =>
                                                    handleClickTags(
                                                        tag as string
                                                    )
                                                }
                                                colorScheme={
                                                    selectedTags === tag
                                                        ? 'blue'
                                                        : 'gray'
                                                }
                                                whiteSpace={'normal'}
                                            >
                                                {tag?.toString()?.toLowerCase()}
                                            </Button>
                                        );
                                    }
                                )}
                            </SimpleGrid>
                        )}
                        <CreateCard
                            setRecommendations={setRecommendations}
                            recommendations={recommendations}
                            spaceId={spaceId}
                            spaceName={spaceName}
                            handleSubmission={handleSubmission}
                            w={'100%'}
                            mb={4}
                        />

                        <SimpleGrid
                            gridTemplateColumns={
                                'repeat(auto-fill, minmax(240px,1fr));'
                            }
                            spacing={3}
                            mx={'auto'}
                            p={{ base: '0px', md: '1vw' }}
                            boxShadow={'lg'}
                            borderRadius={'lg'}
                            width={'100%'}
                            bg={'gray.50'}
                            zIndex={3}
                        >
                            {/* all cards being displayed */}
                            {filteredItems?.map(
                                (content: InfoCardCollectionProps) => {
                                    return (
                                        <>
                                            <InfoCard
                                                key={content.id}
                                                cardId={Number(content.id)}
                                                spaceId={spaceId}
                                                tags={content.tags}
                                                title={content.title}
                                                text={content.text}
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
                        </SimpleGrid>

                        {recommendations?.length > 0 && (
                            <>
                                <Heading
                                    mt={'32px !important'}
                                    size={'sm'}
                                    alignSelf={'flex-start'}
                                >
                                    AI recommendations
                                </Heading>

                                <Divider
                                    orientation="horizontal"
                                    borderColor={'gray.500'}
                                />
                            </>
                        )}
                        <SimpleGrid
                            width={'100%'}
                            gridTemplateColumns={
                                'repeat(auto-fill, minmax(240px,1fr));'
                            }
                            spacing={3}
                            mx={'auto'}
                            p={{ base: '0px', md: '1vw' }}
                            boxShadow={'lg'}
                            borderRadius={'lg'}
                            bg={'gray.50'}
                            zIndex={3}
                        >
                            {recommendations?.length > 0 &&
                                typeof recommendations !== 'string' &&
                                recommendations?.map(
                                    (recommendation: any, idx: number) => (
                                        <AiCard
                                            recommendation={recommendation}
                                            setRecommendations={
                                                setRecommendations
                                            }
                                            recommendations={recommendations}
                                            handleSubmission={handleSubmission}
                                            key={recommendation.id}
                                            tags={recommendation.tags}
                                            title={recommendation.title}
                                            text={recommendation.text}
                                        />
                                    )
                                )}
                        </SimpleGrid>
                    </VStack>
                </Box>
            )}
        </>
    );
};

export default InfoCardCollection;

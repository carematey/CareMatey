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
import { useSession } from 'next-auth/react';
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
    const { data: session } = useSession();
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
        mutate();
    };

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
                    <VStack
                        w={'100%'}
                        h={'calc(min(750px, 100vh) - 4rem)'}
                        width={'100%'}
                    >
                        <HStack
                            flexDir={'row'}
                            justifyContent={'flex-start'}
                            wrap={'wrap'}
                            top={'0'}
                            p={4}
                            boxShadow={'lg'}
                            borderRadius={'lg'}
                            bg={'gray.50'}
                            width={'100%'}
                        >
                            <Button
                                key={0}
                                h={'20'}
                                onClick={() => handleClickTags('')}
                            >
                                CLEAR FILTER
                            </Button>
                            {/* filter tags */}
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
                                                ? 'blackAlpha.500'
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
                        </HStack>{' '}
                        <InfoCard
                            setRecommendations={setRecommendations}
                            recommendations={recommendations}
                            mutate={mutate}
                            spaceId={spaceId}
                            spaceName={spaceName}
                            toCreate
                            handleSubmission={handleSubmission}
                            w={'100%'}
                            mb={4}
                        />
                        <SimpleGrid
                            minChildWidth={'14rem'}
                            spacing={3}
                            p={'35px'}
                            boxShadow={'lg'}
                            borderRadius={'lg'}
                            width={'100%'}
                            bg={'gray.50'}
                            gridTemplateColumns={'repeat(auto-fit, 300px)'}
                        >
                            {/* all cards being displayed */}
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
                        </SimpleGrid>
                        <Divider
                            orientation="horizontal"
                            borderColor={'black'}
                        />
                        <SimpleGrid
                            minChildWidth="10rem"
                            spacing={4}
                            width={'100%'}
                            alignItems={'flex-end'}
                            gridTemplateColumns={'repeat(auto-fit, 300px)'}
                        >
                            {recommendations?.length > 0 &&
                                typeof recommendations !== 'string' &&
                                recommendations?.map(
                                    (recommendation: any, idx: number) => (
                                        <VStack key={idx}>
                                            <InfoCard
                                                key={recommendation.id}
                                                tags={recommendation.tags}
                                                title={recommendation.title}
                                                text={recommendation.text}
                                                toCreate={false}
                                            />

                                            <ButtonGroup
                                                alignSelf={'flex-start'}
                                            >
                                                {/* save and cancel buttons */}
                                                <Button
                                                    colorScheme="blue"
                                                    onClick={() => {
                                                        handleSubmission({
                                                            title: recommendation.title,
                                                            text: recommendation.text,
                                                            tags: recommendation.tags,
                                                        });
                                                        setRecommendations(
                                                            recommendations.filter(
                                                                (rec: any) =>
                                                                    rec.title !==
                                                                    recommendation.title
                                                            )
                                                        );
                                                    }}
                                                >
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
                                    )
                                )}
                        </SimpleGrid>
                    </VStack>
                </>
            )}
        </>
    );
};

export default InfoCardCollection;

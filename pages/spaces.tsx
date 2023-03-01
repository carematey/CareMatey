import {
    Container,
    Divider,
    HStack,
    Text,
    VStack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    IconButton,
    Input,
    ButtonGroup,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import InfoCardCollection from '../components/InfoCardCollection';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { useSession } from 'next-auth/react';
import { Space } from '@prisma/client';
import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

//@temporary:
const spaceId = 1;

const Space = () => {
    const { data: session } = useSession();
    const [selectedSpaceId, setSelectedSpaceId] = React.useState<number>();
    const {
        data: spaces,
        error,
        isLoading,
        mutate,
    } = useSWR(
        session?.user && `/api/spaces/user/${session?.user?.id}`,
        fetcher
    );

    const {
        data: cards,
        error: errorCards,
        isLoading: isLoadingCards,
    } = useSWR(
        !!selectedSpaceId && `/api/cards/space/${selectedSpaceId}`,
        fetcher
    );

    const selectedSpace = useMemo(
        () =>
            spaces &&
            spaces.find((space: Space) => space.id === selectedSpaceId),
        [selectedSpaceId]
    );

    const handleCreateSpace = async () => {
        const res = await fetch(`/api/spaces/${session?.user?.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newSpaceName,
                ownerId: session?.user?.id,
            }),
        });
        const data = await res.json();
        console.log(data);
    };

    const [creatingSpace, setCreatingSpace] = React.useState<boolean>(false);
    const [newSpaceName, setNewSpaceName] = React.useState<string>('');
    return (
        <Container maxW={'100%'}>
            {session ? (
                <>
                    <HStack width={'100%'}>
                        <VStack
                            display={{ base: 'none', md: 'flex' }}
                            w={{ base: 0, md: '20vw' }}
                            alignSelf={'flex-start'}
                            py={8}
                        >
                            <Text
                                p={4}
                                w={'100%'}
                                bg={'gray.100'}
                                color={'gray.600'}
                                fontWeight={'bold'}
                                justifySelf={'flex-start'}
                            >
                                {selectedSpace?.name || 'Select a space'}
                            </Text>
                            <Accordion
                                allowToggle
                                background={'#ffffff'}
                                py={6}
                                minH={'477px'}
                                maxW={'473px'}
                                w={'100%'}
                            >
                                <AccordionItem
                                    borderColor={'black '}
                                    borderTopColor={'transparent !important'}
                                >
                                    <Text>
                                        <AccordionButton borderColor={'black'}>
                                            <Box
                                                as="span"
                                                flex="1"
                                                textAlign="left"
                                            >
                                                All spaces
                                            </Box>
                                            <AccordionIcon fontSize={'xxl'} />
                                        </AccordionButton>
                                    </Text>
                                    <AccordionPanel py={4}>
                                        {/* map spaces here */}
                                        <IconButton
                                            icon={<AddIcon />}
                                            aria-label="Add"
                                            w={'100%'}
                                            my={2}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCreatingSpace(true);
                                                setTimeout(() => {
                                                    document
                                                        ?.getElementById(
                                                            'new-space'
                                                        )
                                                        ?.focus();
                                                }, 100);
                                            }}
                                        />
                                    </AccordionPanel>
                                    {creatingSpace && (
                                        <AccordionPanel
                                            py={4}
                                            display={'flex'}
                                            flexDir={'column'}
                                        >
                                            <Input
                                                onChange={(e) => {
                                                    setNewSpaceName(
                                                        e.target.value
                                                    );
                                                }}
                                                id={'new-space'}
                                                w={'100%'}
                                                mb={2}
                                            />
                                            <ButtonGroup alignSelf={'flex-end'}>
                                                <IconButton
                                                    aria-label="cancel"
                                                    colorScheme={'red'}
                                                    opacity={0.8}
                                                    icon={<CloseIcon />}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCreatingSpace(false);
                                                        setNewSpaceName('');
                                                    }}
                                                />
                                                <IconButton
                                                    aria-label="save"
                                                    colorScheme={'green'}
                                                    opacity={0.8}
                                                    icon={<CheckIcon />}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleCreateSpace();
                                                        setCreatingSpace(false);
                                                        setNewSpaceName('');
                                                        setTimeout(() => {
                                                            mutate();
                                                        }, 100);
                                                    }}
                                                />
                                            </ButtonGroup>
                                        </AccordionPanel>
                                    )}
                                    <Divider borderColor={'gray.300'} />
                                    <AccordionPanel py={4}>
                                        {/* map spaces here */}
                                        {spaces?.map((space: Space) => (
                                            <Button
                                                w={'100%'}
                                                my={2}
                                                colorScheme={
                                                    selectedSpaceId === space.id
                                                        ? 'blackAlpha'
                                                        : 'teal'
                                                }
                                                key={space.id}
                                                onClick={() => {
                                                    setSelectedSpaceId(
                                                        space.id
                                                    );
                                                }}
                                            >
                                                {space.name}
                                            </Button>
                                        ))}
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </VStack>
                        <Divider
                            display={{ base: 'none', md: 'block' }}
                            orientation="vertical"
                            borderColor={'black'}
                            h={'calc(min(750px, calc(100vh - 100px)))'}
                        />
                        {selectedSpaceId && (
                            <InfoCardCollection
                                data={cards}
                                isLoading={isLoadingCards}
                            />
                        )}
                    </HStack>
                </>
            ) : (
                <Text>Please login</Text>
            )}
        </Container>
    );
};

export default Space;

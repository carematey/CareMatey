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
    InputGroup,
    InputRightElement,
    Stack,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import InfoCardCollection from '../components/InfoCardCollection';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { useSession } from 'next-auth/react';
import { Space } from '@prisma/client';
import {
    AddIcon,
    CheckIcon,
    CloseIcon,
    DeleteIcon,
    EditIcon,
} from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const Space = () => {
    const { data: session } = useSession();

    const MotionIcon = motion(IconButton);
    const MotionButton = motion(Button);

    const [creatingSpace, setCreatingSpace] = React.useState<boolean>(false);
    const [newSpaceName, setNewSpaceName] = React.useState<string>('');

    const [editMode, setEditMode] = React.useState<boolean>(false);

    const [editNameId, setEditNameId] = React.useState<number | null>(null);
    const [editSpaceNameValue, setEditSpaceNameValue] =
        React.useState<string>('');

    const [selectedSpaceId, setSelectedSpaceId] = React.useState<number | null>(
        null
    );

    const {
        data: spaces,
        error,
        isLoading,
        mutate,
    } = useSWR(
        session?.user && `/api/spaces/user/${session?.user?.id}`,
        fetcher
    );

    const selectedSpace: Space = useMemo(
        () =>
            spaces &&
            spaces.find((space: Space) => space.id === selectedSpaceId),
        [selectedSpaceId, spaces]
    );

    const handleCreateSpace = async () => {
        if (!newSpaceName.length) return;
        setCreatingSpace(false);
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
        mutate([...spaces, { name: newSpaceName, ownerId: session?.user?.id }]);
        setNewSpaceName('');
        const data = await res.json();
        return data;
    };

    const handleDeleteSpace = async (spaceId: number) => {
        if (spaceId === selectedSpaceId) {
            setSelectedSpaceId(null);
        }

        const res = await fetch(`/api/spaces/${spaceId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const newSpaces = spaces.filter((space: Space) => space.id !== spaceId);
        mutate(newSpaces, false);

        const data = await res.json();
    };

    const handleEditSpaceName = async (spaceId: number) => {
        if (!editSpaceNameValue.length) return;
        const res = await fetch(`/api/spaces/${spaceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: editSpaceNameValue,
            }),
        });
        const newSpaces = spaces.map((space: Space) => {
            if (space.id === spaceId) {
                return {
                    ...space,
                    name: editSpaceNameValue,
                };
            }
            return space;
        });

        mutate(newSpaces, false);

        return res;
    };

    return (
        <Container h={'100%'} maxW={'100%'}>
            {session ? (
                <>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        width={'100%'}
                        height={{ md: '100%' }}
                    >
                        <VStack
                            display={'flex'}
                            position={'sticky'}
                            top={{ base: 8, md: '4rem' }}
                            w={{ base: '100%', md: '27.5vw' }}
                            alignSelf={'flex-start'}
                        >
                            <Accordion
                                defaultIndex={[0]}
                                allowToggle
                                background={'#ffffff'}
                                py={6}
                                maxW={'473px'}
                                w={'100%'}
                            >
                                <AccordionItem
                                    borderColor={'whiteAlpha'}
                                    borderTopColor={'transparent !important'}
                                >
                                    <AccordionButton borderColor={'black'}>
                                        <Box
                                            as="span"
                                            flex="1"
                                            textAlign="left"
                                        >
                                            <Text
                                                p={4}
                                                w={'100%'}
                                                bg={'gray.100'}
                                                color={'gray.600'}
                                                fontWeight={'bold'}
                                            >
                                                {selectedSpace?.name ||
                                                    'Select a space'}
                                                <AccordionIcon
                                                    mt={1}
                                                    float={'right'}
                                                    fontSize={'xxl'}
                                                />
                                            </Text>
                                        </Box>
                                    </AccordionButton>

                                    <AccordionPanel py={4}>
                                        <ButtonGroup w={'100%'}>
                                            <MotionIcon
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.99 }}
                                                icon={<AddIcon />}
                                                colorScheme={
                                                    creatingSpace
                                                        ? 'blackAlpha'
                                                        : 'gray'
                                                }
                                                aria-label="Add"
                                                w={'100%'}
                                                my={2}
                                                onClick={() => {
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
                                            <MotionIcon
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.99 }}
                                                icon={<EditIcon />}
                                                aria-label="Edit"
                                                colorScheme={
                                                    editMode
                                                        ? 'blackAlpha'
                                                        : 'gray'
                                                }
                                                w={'100%'}
                                                my={2}
                                                onClick={() => {
                                                    setEditNameId(null);
                                                    setEditMode(!editMode);
                                                }}
                                            />
                                        </ButtonGroup>
                                    </AccordionPanel>

                                    {creatingSpace && (
                                        <>
                                            <AccordionPanel
                                                pt={4}
                                                display={'flex'}
                                                flexDir={'column'}
                                                pb={'0 !important'}
                                            >
                                                <InputGroup pb={'0 !important'}>
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
                                                    <InputRightElement>
                                                        <ButtonGroup
                                                            isAttached
                                                            pr={10}
                                                        >
                                                            <MotionIcon
                                                                whileHover={{
                                                                    scale: 1.02,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.99,
                                                                }}
                                                                aria-label="cancel"
                                                                colorScheme={
                                                                    'red'
                                                                }
                                                                opacity={0.8}
                                                                icon={
                                                                    <CloseIcon />
                                                                }
                                                                onClick={() => {
                                                                    setCreatingSpace(
                                                                        false
                                                                    );
                                                                    setNewSpaceName(
                                                                        ''
                                                                    );
                                                                }}
                                                            />
                                                            <MotionIcon
                                                                whileHover={{
                                                                    scale: 1.02,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.99,
                                                                }}
                                                                aria-label="save"
                                                                colorScheme={
                                                                    'green'
                                                                }
                                                                opacity={0.8}
                                                                icon={
                                                                    <CheckIcon />
                                                                }
                                                                onClick={() => {
                                                                    handleCreateSpace();
                                                                }}
                                                            />
                                                        </ButtonGroup>
                                                    </InputRightElement>
                                                </InputGroup>
                                            </AccordionPanel>
                                        </>
                                    )}
                                    <AccordionPanel pb={4} pt={0}>
                                        {/* map spaces here */}
                                        {spaces?.map((space: Space) => (
                                            <ButtonGroup
                                                key={space.id}
                                                w={'100%'}
                                                alignItems={'center'}
                                            >
                                                {editNameId === space.id &&
                                                editMode ? (
                                                    <Input
                                                        my={2}
                                                        onChange={(e) => {
                                                            setEditSpaceNameValue(
                                                                e.target.value
                                                            );
                                                        }}
                                                        defaultValue={
                                                            space.name || ''
                                                        }
                                                    />
                                                ) : (
                                                    <MotionButton
                                                        whileHover={{
                                                            scale: 1.02,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.99,
                                                        }}
                                                        w={'100%'}
                                                        my={2}
                                                        colorScheme={
                                                            selectedSpaceId ===
                                                            space.id
                                                                ? 'blackAlpha'
                                                                : 'gray'
                                                        }
                                                        key={space.id}
                                                        onClick={() => {
                                                            setSelectedSpaceId(
                                                                space.id
                                                            );
                                                        }}
                                                    >
                                                        {space.name}
                                                    </MotionButton>
                                                )}
                                                {editMode ? (
                                                    editNameId !== space.id ? (
                                                        <>
                                                            <MotionIcon
                                                                whileHover={{
                                                                    scale: 1.02,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.99,
                                                                }}
                                                                size={'md'}
                                                                aria-label="edit"
                                                                colorScheme={
                                                                    editNameId ===
                                                                    space.id
                                                                        ? 'blackAlpha'
                                                                        : 'gray'
                                                                }
                                                                icon={
                                                                    <EditIcon />
                                                                }
                                                                onClick={() => {
                                                                    setEditNameId(
                                                                        space.id
                                                                    );
                                                                }}
                                                            />
                                                            <MotionIcon
                                                                whileHover={{
                                                                    scale: 1.02,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.99,
                                                                }}
                                                                size={'md'}
                                                                aria-label="delete"
                                                                icon={
                                                                    <DeleteIcon />
                                                                }
                                                                onClick={() => {
                                                                    handleDeleteSpace(
                                                                        space.id
                                                                    );
                                                                }}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <MotionIcon
                                                                whileHover={{
                                                                    scale: 1.02,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.99,
                                                                }}
                                                                size={'md'}
                                                                aria-label="cancel"
                                                                colorScheme={
                                                                    'red'
                                                                }
                                                                opacity={0.8}
                                                                icon={
                                                                    <CloseIcon />
                                                                }
                                                                onClick={() => {
                                                                    setEditNameId(
                                                                        null
                                                                    );
                                                                    setEditSpaceNameValue(
                                                                        ''
                                                                    );
                                                                }}
                                                            />
                                                            <MotionIcon
                                                                whileHover={{
                                                                    scale: 1.02,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.99,
                                                                }}
                                                                size={'md'}
                                                                aria-label="save"
                                                                colorScheme={
                                                                    'green'
                                                                }
                                                                opacity={0.8}
                                                                icon={
                                                                    <CheckIcon />
                                                                }
                                                                onClick={() => {
                                                                    handleEditSpaceName(
                                                                        space.id
                                                                    );
                                                                    setEditNameId(
                                                                        null
                                                                    );
                                                                    setEditSpaceNameValue(
                                                                        ''
                                                                    );
                                                                }}
                                                            />
                                                        </>
                                                    )
                                                ) : null}
                                            </ButtonGroup>
                                        ))}
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </VStack>
                        <Divider
                            display={{ base: 'none', md: 'block' }}
                            orientation="vertical"
                            borderColor={'whiteAlpha.'}
                            h={'calc(min(750px, calc(100vh - 4rem)))'}
                        />
                        {selectedSpaceId && (
                            <InfoCardCollection
                                spaceName={selectedSpace?.name}
                                spaceId={selectedSpaceId}
                            />
                        )}
                    </Stack>
                </>
            ) : (
                <Text>Please login</Text>
            )}
        </Container>
    );
};

export default Space;

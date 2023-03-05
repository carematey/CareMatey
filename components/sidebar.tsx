import {
    AddIcon,
    CheckIcon,
    CloseIcon,
    DeleteIcon,
    EditIcon,
} from '@chakra-ui/icons';
import {
    Accordion,
    VStack,
    Text,
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
    useDisclosure,
    Modal,
    ModalHeader,
    ModalBody,
    ModalOverlay,
    ModalContent,
    Divider,
    Heading,
} from '@chakra-ui/react';
import { Space, SpaceAuthorization } from '@prisma/client';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

export function Sidebar({
    setSelectedSpaceId,
    selectedSpaceId,
    selectedSpace,
}: {
    selectedSpaceId: number | null;
    setSelectedSpaceId: React.Dispatch<React.SetStateAction<number | null>>;
    selectedSpace: Space | undefined;
}) {
    const { data: session } = useSession();
    const MotionIcon = motion(IconButton);
    const MotionButton = motion(Button);

    const [creatingSpace, setCreatingSpace] = React.useState<boolean>(false);
    const [newSpaceName, setNewSpaceName] = React.useState<string>('');

    const [editMode, setEditMode] = React.useState<boolean>(false);

    const [editNameId, setEditNameId] = React.useState<number | null>(null);
    const [editSpaceNameValue, setEditSpaceNameValue] =
        React.useState<string>('');

    const [deleteSpaceId, setDeleteSpaceId] = React.useState<number | null>(
        null
    );
    const { onOpen, onClose, isOpen } = useDisclosure();

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
        data: authorizedSpaces,
        error: authorizedSpacesError,
        isLoading: authorizedSpacesLoading,
    } = useSWR(
        session?.user && `/api/spaces/${session?.user?.id}/authorization`,
        fetcher
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
        <VStack
            display={'flex'}
            position={'sticky'}
            top={{
                base: 8,
                md: '4rem',
            }}
            w={{
                base: '100%',
                md: '27.5vw',
            }}
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
                    <AccordionButton
                        borderColor={'black'}
                        _hover={{ bg: 'none' }}
                    >
                        <Box as="span" flex="1" textAlign="left">
                            <Text
                                p={4}
                                w={'100%'}
                                bg={'gray.100'}
                                color={'gray.600'}
                                _hover={{ bg: 'gray.200' }}
                                fontWeight={'bold'}
                            >
                                {selectedSpace?.name || 'Select a space'}
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
                                whileHover={{
                                    scale: 1.02,
                                }}
                                whileTap={{
                                    scale: 0.99,
                                }}
                                icon={<AddIcon />}
                                colorScheme={creatingSpace ? 'blue' : 'gray'}
                                aria-label="Add"
                                w={'100%'}
                                my={2}
                                onClick={() => {
                                    setCreatingSpace(true);
                                    setTimeout(() => {
                                        document
                                            ?.getElementById('new-space')
                                            ?.focus();
                                    }, 100);
                                }}
                            />
                            <MotionIcon
                                whileHover={{
                                    scale: 1.02,
                                }}
                                whileTap={{
                                    scale: 0.99,
                                }}
                                icon={<EditIcon />}
                                aria-label="Edit"
                                colorScheme={editMode ? 'blue' : 'gray'}
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
                                            setNewSpaceName(e.target.value);
                                        }}
                                        id={'new-space'}
                                        w={'100%'}
                                        mb={2}
                                    />
                                    <InputRightElement>
                                        <ButtonGroup isAttached pr={10}>
                                            <MotionIcon
                                                whileHover={{
                                                    scale: 1.02,
                                                }}
                                                whileTap={{
                                                    scale: 0.99,
                                                }}
                                                aria-label="cancel"
                                                colorScheme={'red'}
                                                opacity={0.9}
                                                icon={<CloseIcon />}
                                                onClick={() => {
                                                    setCreatingSpace(false);
                                                    setNewSpaceName('');
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
                                                colorScheme={'teal'}
                                                opacity={0.9}
                                                icon={<CheckIcon />}
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
                                {editNameId === space.id && editMode ? (
                                    <Input
                                        my={2}
                                        onChange={(e) => {
                                            setEditSpaceNameValue(
                                                e.target.value
                                            );
                                        }}
                                        defaultValue={space.name || ''}
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
                                            selectedSpaceId === space.id
                                                ? 'blue'
                                                : 'gray'
                                        }
                                        key={space.id}
                                        onClick={() => {
                                            setSelectedSpaceId(space.id);
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
                                                    editNameId === space.id
                                                        ? 'blue'
                                                        : 'gray'
                                                }
                                                icon={<EditIcon />}
                                                onClick={() => {
                                                    setEditNameId(space.id);
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
                                                icon={<DeleteIcon />}
                                                onClick={() => {
                                                    setDeleteSpaceId(space.id);
                                                    onOpen();
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
                                                colorScheme={'red'}
                                                opacity={0.9}
                                                icon={<CloseIcon />}
                                                onClick={() => {
                                                    setEditNameId(null);
                                                    setEditSpaceNameValue('');
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
                                                colorScheme={'teal'}
                                                opacity={0.9}
                                                icon={<CheckIcon />}
                                                onClick={() => {
                                                    handleEditSpaceName(
                                                        space.id
                                                    );
                                                    setEditNameId(null);
                                                    setEditSpaceNameValue('');
                                                }}
                                            />
                                        </>
                                    )
                                ) : null}
                            </ButtonGroup>
                        ))}
                        <Divider borderColor={'gray.400'} />
                        <Heading color={'black'} opacity={'0.7'} size={'md'}>
                            shared spaces
                        </Heading>
                        {authorizedSpaces?.map((space: SpaceAuthorization) => (
                            <ButtonGroup
                                key={space.spaceId}
                                w={'100%'}
                                alignItems={'center'}
                            >
                                {/* {editNameId === space.spaceId && editMode ? (
                                    <Input
                                        my={2}
                                        onChange={(e) => {
                                            setEditSpaceNameValue(
                                                e.target.value
                                            );
                                        }}
                                        defaultValue={space.spaceName || ''}
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
                                            selectedSpaceId === space.spaceId
                                                ? 'blue'
                                                : 'gray'
                                        }
                                        key={space.spaceId}
                                        onClick={() => {
                                            setSelectedSpaceId(space.spaceId);
                                        }}
                                    >
                                        {space.spaceName}
                                    </MotionButton>
                                )}
                                {editMode ? (
                                    editNameId !== space.spaceId ? (
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
                                                    editNameId === space.spaceId
                                                        ? 'blue'
                                                        : 'gray'
                                                }
                                                icon={<EditIcon />}
                                                onClick={() => {
                                                    setEditNameId(
                                                        space.spaceId
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
                                                icon={<DeleteIcon />}
                                                onClick={() => {
                                                    setDeleteSpaceId(
                                                        space.spaceId
                                                    );
                                                    onOpen();
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
                                                colorScheme={'red'}
                                                opacity={0.9}
                                                icon={<CloseIcon />}
                                                onClick={() => {
                                                    setEditNameId(null);
                                                    setEditSpaceNameValue('');
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
                                                colorScheme={'teal'}
                                                opacity={0.9}
                                                icon={<CheckIcon />}
                                                onClick={() => {
                                                    handleEditSpaceName(
                                                        space.spaceId
                                                    );
                                                    setEditNameId(null);
                                                    setEditSpaceNameValue('');
                                                }}
                                            />
                                        </>
                                    )
                                ) : null} */}
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
                                        selectedSpaceId === space.spaceId
                                            ? 'blue'
                                            : 'gray'
                                    }
                                    key={space.spaceId}
                                    onClick={() => {
                                        setSelectedSpaceId(space.spaceId);
                                    }}
                                >
                                    {space.spaceName}
                                </MotionButton>
                            </ButtonGroup>
                        ))}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent p={4}>
                        <ModalHeader>WARNING!</ModalHeader>
                        <ModalBody>
                            <Text>
                                You are about to delete a space. This action
                                cannot be undone.
                            </Text>
                        </ModalBody>
                        <ButtonGroup alignSelf={'flex-end'}>
                            <Button colorScheme={'red'} onClick={onClose}>
                                No, cancel
                            </Button>
                            <Button
                                colorScheme={'teal'}
                                onClick={() => {
                                    onClose();
                                    handleDeleteSpace(deleteSpaceId as number);
                                }}
                            >
                                Yes, delete space
                            </Button>
                        </ButtonGroup>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </VStack>
    );
}

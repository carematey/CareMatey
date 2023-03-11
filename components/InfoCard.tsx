import {
    ChakraProps,
    Card,
    Heading,
    Text,
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    ModalHeader,
    ModalFooter,
    ModalOverlay,
    HStack,
    ButtonGroup,
    IconButton,
    Input,
    Textarea,
    Container,
} from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import theme from '../theme';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Tags from './Tags';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

interface InfoCardProps extends ChakraProps {
    text?: string;
    title?: string;
    tags?: string[];
    date?: Date;
    spaceId?: number;
    cardId?: number;
    spaceName?: string | null | undefined;
}

const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const { spaceId, tags, text, title, date, spaceName, cardId, ...rest } =
        props;
    const { data, mutate } = useSWR(
        !!spaceId && `/api/cards/space/${spaceId}`,
        fetcher
    );
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [newTag, setNewTag] = React.useState<string>(''); // TODO: add tags. Tags need to be able to add more than one

    const newTitleRef = useRef<HTMLInputElement | null>(null);
    const newTextRef = useRef<HTMLTextAreaElement | null>(null);

    const [newCardValues, setNewCardValues] = React.useState<{
        title: string;
        text: string;
        tags: string[];
    }>({
        title: title as string,
        text: text as string,
        tags: tags as string[],
    });
    const handleEditCard = async () => {
        const res = await fetch(`/api/cards/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                title: newTitleRef.current?.value,
                text: newTextRef.current?.value,
                tags: newCardValues.tags,
            }),
        });

        setEditMode(false);
        mutate();
        onClose();
        const result = await res.json();
    };
    const handleDeleteCard = async () => {
        const res = await fetch(`/api/cards/${cardId}`, {
            method: 'DELETE',
        });
        onClose();
        mutate(
            data?.filter((card: any) => {
                return card.id !== cardId;
            })
        );
        const result = await res.json();
    };

    const handleDeleteTag = (index: number): void => {
        const newTagValues: string[] = newCardValues.tags.filter((card) => {
            return (
                card.toLocaleLowerCase() !==
                newCardValues.tags[index].toLocaleLowerCase()
            );
        });
        setNewCardValues({ ...newCardValues, tags: newTagValues });
    };
    const handleAddTag = (tag: string): void => {
        if (tag === '') return;
        const newTagValues: string[] = [...newCardValues.tags, tag];
        setNewCardValues({ ...newCardValues, tags: newTagValues });
    };

    useEffect(() => {
        setEditMode(false);
        return () => {};
    }, [isOpen]);

    const dt = { time: date };
    const updatedTime = new Date(dt!.time!).toLocaleDateString();
    const MotionIcon = motion(IconButton);
    const MotionModal = motion(ModalContent);
    const gradientAngles = [0, 45, 90, 135, 180, 225, 270, 315];
    return (
        <>
            <Card
                p={4}
                {...rest}
                rounded={'lg'}
                cursor={'pointer'}
                onClick={onOpen}
                minH={'170px'}
                w={'100%'}
                maxW={{ base: 'inherit', md: '300px' }}
                justifyContent={'space-between'}
                justifySelf={'center'}
                background={`linear-gradient(${
                    gradientAngles[
                        ((cardId as number) || 0) % gradientAngles.length
                    ]
                }deg, rgba(255,255,255,.1) 0%, rgba(153,153,255,.1) 100%, rgba(166,240,255,.1) 100%)`}
                backdropFilter={'blur( 14.5px )'}
                borderRadius={'10px'}
                border={'1px solid rgba( 255, 255, 255, 0.18 )'}
            >
                <Heading color={theme.colors.brand.blue.dark} size={'md'}>
                    {title}
                </Heading>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {text != undefined && text.length > 90
                        ? text.slice(0, 90) + '...'
                        : (text as string)}
                </ReactMarkdown>
                <Tags tags={tags} tagSize={'sm'} />
            </Card>
            <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    background={
                        'linear-gradient(50deg, rgba(255,255,255,.1) 0%, rgba(153,153,255,.1) 100%, rgba(166,240,255,.1) 100%)'
                    }
                    backdropFilter={'blur( 4px )'}
                />
                {isOpen && (
                    <MotionModal
                        initial={{
                            opacity: isOpen ? 1 : 0, // prevent render while typing from causing an animation
                            scale: isOpen ? 1 : 0.3,
                        }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35 }}
                        m={'auto'}
                        bg={'white'}
                        maxH={'83vh'}
                        overflowY={'scroll'}
                        background={
                            'linear-gradient(50deg, rgba(255,255,255,.05) 0%, rgba(153,153,255,.05) 100%, rgba(166,240,255,.05) 100%)'
                        }
                        backdropFilter={'blur( 65.5px )'}
                        borderRadius={'10px'}
                        border={'1px solid rgba( 255, 255, 255, 0.18 )'}
                    >
                        <HStack w={'100%'} justifyContent={'space-between'}>
                            {!editMode ? (
                                <ModalHeader
                                    flex={1}
                                    color={theme.colors.brand.blue.dark}
                                >
                                    {title}
                                </ModalHeader>
                            ) : (
                                <Input
                                    bg={'#ffffff90'}
                                    defaultValue={newCardValues?.title}
                                    ref={newTitleRef}
                                    m={4}
                                />
                            )}
                            <Text minW="10ch" p={4}>
                                <>
                                    Last Updated
                                    <br />
                                    {updatedTime}
                                </>
                            </Text>
                        </HStack>
                        <ModalBody p={editMode ? 0 : 6}>
                            {!editMode ? (
                                <Container
                                    overflowX={editMode ? 'clip' : 'scroll'}
                                >
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {text as string}
                                    </ReactMarkdown>
                                </Container>
                            ) : (
                                <Textarea
                                    w={'93%'}
                                    h={'40vh'}
                                    bg={'#ffffff90'}
                                    defaultValue={newCardValues?.text}
                                    ref={newTextRef}
                                    m={4}
                                />
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <HStack
                                justifyContent={'space-between'}
                                alignItems={'flex-start'}
                                w={'100%'}
                            >
                                <Tags
                                    tags={editMode ? newCardValues.tags : tags}
                                    tagSize={'lg'}
                                    editMode={editMode}
                                    handleAddTag={handleAddTag}
                                    handleDeleteTag={handleDeleteTag}
                                />

                                <ButtonGroup alignSelf={'flex-end'}>
                                    {!editMode ? (
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
                                                colorScheme={'gray'}
                                                icon={<EditIcon />}
                                                onClick={() => {
                                                    setEditMode(true);
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
                                                    handleDeleteCard();
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
                                                    setEditMode(false);
                                                    setNewCardValues({
                                                        title: title as string,
                                                        text: text as string,
                                                        tags: tags as string[],
                                                    });
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
                                                    setEditMode(false);
                                                    handleEditCard();
                                                }}
                                            />
                                        </>
                                    )}
                                </ButtonGroup>
                            </HStack>
                        </ModalFooter>
                    </MotionModal>
                )}
            </Modal>
        </>
    );
};
export default InfoCard;

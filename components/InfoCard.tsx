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
    Box,
    Container,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
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
                title: newCardValues.title,
                text: newCardValues.text,
                tags: newCardValues.tags,
            }),
        });

        mutate(
            data?.map((card: any) => {
                if (card.id === cardId) {
                    return {
                        ...card,
                        title: newCardValues.title,
                        text: newCardValues.text,
                        tags: newCardValues.tags,
                    };
                }
                return card;
            })
        );
        const result = await res.json();
        setEditMode(false);

        onClose();
    };
    const handleDeleteCard = async () => {
        const res = await fetch(`/api/cards/${cardId}`, {
            method: 'DELETE',
        });
        mutate(
            data?.filter((card: any) => {
                return card.id !== cardId;
            })
        );
        const result = await res.json();
        onClose();
    };

    useEffect(() => {
        setEditMode(false);
        return () => {};
    }, [isOpen]);

    const dt = { time: date };
    const updatedTime = new Date(dt!.time!).toLocaleDateString();
    const MotionIcon = motion(IconButton);
    return (
        <>
            <Card
                p={4}
                {...rest}
                rounded={'lg'}
                boxShadow={'lg'}
                cursor={'pointer'}
                onClick={onOpen}
                minH={'170px'}
                w={'100%'}
                maxW={{ base: 'inherit', md: '300px' }}
                justifyContent={'space-between'}
                justifySelf={'center'}
            >
                <Heading color={theme.colors.brand.blue.dark} size={'lg'}>
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
                <ModalOverlay />
                <ModalContent bg={'white'} maxH={'83vh'} overflowY={'scroll'}>
                    <HStack w={'100%'} justifyContent={'space-between'}>
                        {!editMode ? (
                            <ModalHeader color={theme.colors.brand.blue.dark}>
                                {title}
                            </ModalHeader>
                        ) : (
                            <Input
                                value={newCardValues?.title}
                                onChange={(e) =>
                                    setNewCardValues({
                                        ...newCardValues,
                                        title: e.target.value,
                                    })
                                }
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
                            <Container overflowX={editMode ? 'clip' : 'scroll'}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {text as string}
                                </ReactMarkdown>
                            </Container>
                        ) : (
                            <Textarea
                                w={'93%'}
                                h={'40vh'}
                                value={newCardValues?.text}
                                onChange={(e) =>
                                    setNewCardValues({
                                        ...newCardValues,
                                        text: e.target.value,
                                    })
                                }
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
                            <Tags tags={tags} tagSize={'lg'} />

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
                </ModalContent>
            </Modal>
        </>
    );
};
export default InfoCard;

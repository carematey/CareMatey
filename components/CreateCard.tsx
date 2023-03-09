import { AddIcon } from '@chakra-ui/icons';
import {
    ChakraProps,
    Container,
    Box,
    Card,
    Text,
    Tag,
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    ModalHeader,
    ModalOverlay,
    HStack,
    Center,
    Input,
    Textarea,
    Button,
    VStack,
    InputGroup,
    InputRightElement,
    FormControl,
    TagLabel,
    TagCloseButton,
    ButtonGroup,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { tagColors } from '../utils/tagColors';
import { handleDeleteTag } from '../utils/handleDeleteTags';

interface InfoCardProps extends ChakraProps {
    text?: string;
    title?: string;
    tags?: string[];
    spaceId?: number;
    spaceName?: string | null | undefined;
    recommendations?: any;
    setRecommendations?: any;
    handleSubmission?: any;
}

const CreateCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const {
        spaceId,
        tags,
        text,
        title,
        recommendations,
        setRecommendations,
        handleSubmission,
        spaceName,
        ...rest
    } = props;
    const MotionCenter = motion(Center);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newTag, setNewTag] = React.useState<string>(''); // TODO: add tags. Tags need to be able to add more than one

    const [newCardValues, setNewCardValues] = React.useState<{
        title: string;
        text: string;
        tags: string[];
    }>({
        title: '',
        text: '',
        tags: [],
    });

    // remove all values when modal is closed
    useEffect(() => {
        setNewCardValues({
            title: '',
            text: '',
            tags: [],
        });
        return () => {};
    }, [isOpen]);

    const addTag = () => {
        setNewCardValues({
            ...newCardValues,
            tags: [...newCardValues.tags, newTag],
        });
        setNewTag('');
    };

    const handleAI = async () => {
        const aiRes = await fetch(`/api/ai/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: newCardValues.title,
                text: newCardValues.text,
                tags: newCardValues.tags,
                spaceName: spaceName,
            }),
        });

        const aiResult = await aiRes.json();
        const aiData = aiResult.choices[0].message.content.replaceAll(
            `\"`,
            `"`
        );
        try {
            setRecommendations(JSON.parse(aiData));
        } catch (error) {
            console.log(error);
        }
    };
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
                background={`linear-gradient(${gradientAngles[5]}deg, rgba(255,255,255,.1) 0%, rgba(153,153,255,.1) 100%, rgba(166,240,255,.1) 100%)`}
                backdropFilter={'blur( 14.5px )'}
                borderRadius={'10px'}
                border={'1px solid rgba( 255, 255, 255, 0.18 )'}
            >
                <VStack margin={'auto'}>
                    <AddIcon color="#bbb" boxSize={10} />
                    <Text textAlign={'center'}>Create a new card</Text>
                </VStack>
            </Card>

            <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
                <ModalOverlay
                    background={
                        'linear-gradient(50deg, rgba(255,255,255,.1) 0%, rgba(153,153,255,.1) 100%, rgba(166,240,255,.1) 100%)'
                    }
                    backdropFilter={'blur( 4px )'}
                />
                <ModalContent
                    m={{ base: 2, md: 'auto' }}
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
                    <ModalHeader>
                        {true // @todo: use isOwner
                            ? 'Create a new card'
                            : 'Suggest a new card'}
                    </ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <VStack>
                                <Input
                                    bg={'#ffffff90'}
                                    onChange={(e) =>
                                        setNewCardValues({
                                            ...newCardValues,
                                            title: e.target.value,
                                        })
                                    }
                                    placeholder="Title"
                                    isRequired
                                />

                                <Textarea
                                    bg={'#ffffff90'}
                                    onChange={(e) =>
                                        setNewCardValues({
                                            ...newCardValues,
                                            text: e.target.value,
                                        })
                                    }
                                    placeholder="Instruction content"
                                    h={'40vh'}
                                    isRequired
                                />
                                <InputGroup bg={'#ffffff90'}>
                                    <Input
                                        value={newTag.toLowerCase()}
                                        onChange={(e) =>
                                            setNewTag(
                                                e.target.value.toLowerCase()
                                            )
                                        }
                                        placeholder="Tags"
                                    />
                                    <InputRightElement>
                                        <Button
                                            colorScheme={'blue'}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addTag();
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <HStack
                                    className={'tagList'}
                                    alignSelf={'flex-start'}
                                >
                                    {newCardValues.tags.map(
                                        (tag: string, idx: number) => (
                                            <Tag
                                                colorScheme={
                                                    tagColors[
                                                        tag.toString().length %
                                                            tagColors.length
                                                    ]
                                                }
                                                key={idx}
                                            >
                                                <TagLabel>{tag}</TagLabel>
                                                <TagCloseButton
                                                    onClick={() =>
                                                        handleDeleteTag(
                                                            idx,
                                                            newCardValues,
                                                            setNewCardValues
                                                        )
                                                    }
                                                />
                                            </Tag>
                                        )
                                    )}
                                </HStack>
                                <HStack gap={8}>
                                    <ButtonGroup>
                                        <Button
                                            className="submit submitButton"
                                            onClick={(e) => {
                                                onClose();
                                                handleSubmission(newCardValues);
                                                setNewCardValues({
                                                    title: '',
                                                    text: '',
                                                    tags: [],
                                                });
                                            }}
                                        >
                                            <Text p={8}>Submit</Text>
                                        </Button>
                                        <Button
                                            colorScheme={'blue'}
                                            className="ai submitButton"
                                            // maxW={'8ch'}
                                            fontSize={'xs'}
                                            onClick={(e) => {
                                                onClose();
                                                handleSubmission(newCardValues);
                                                handleAI();
                                                setNewCardValues({
                                                    title: '',
                                                    text: '',
                                                    tags: [],
                                                });
                                            }}
                                        >
                                            [+ AI]
                                        </Button>
                                    </ButtonGroup>
                                </HStack>
                            </VStack>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default CreateCard;

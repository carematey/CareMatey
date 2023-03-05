import { AddIcon } from '@chakra-ui/icons';
import {
    ChakraProps,
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
    const handleDeleteTag = (index: number): void => {
        const newTagValues: string[] = newCardValues.tags.filter((card) => {
            return card !== newCardValues.tags[index];
        });
        setNewCardValues({ ...newCardValues, tags: newTagValues });
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
        setRecommendations(JSON.parse(aiData));
    };

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
                <MotionCenter
                    whileHover={{
                        scale: 1.01,
                    }}
                    whileTap={{
                        scale: 0.99,
                    }}
                    my={'auto'}
                    boxShadow={'lg'}
                    borderRadius={'lg'}
                    p={8}
                    m={0}
                >
                    <VStack>
                        <AddIcon color="#bbb" boxSize={10} />
                        <Text textAlign={'center'}>Create a new card</Text>
                    </VStack>
                </MotionCenter>
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={'white'}>
                    <ModalHeader>
                        {true // @todo: use isOwner
                            ? 'Create a new card'
                            : 'Suggest a new card'}
                    </ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <VStack>
                                <Input
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
                                    onChange={(e) =>
                                        setNewCardValues({
                                            ...newCardValues,
                                            text: e.target.value,
                                        })
                                    }
                                    placeholder="Instruction content"
                                    isRequired
                                />
                                <InputGroup>
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
                                                colorScheme={'twitter'}
                                                key={idx}
                                            >
                                                <TagLabel>{tag}</TagLabel>
                                                <TagCloseButton
                                                    onClick={() =>
                                                        handleDeleteTag(idx)
                                                    }
                                                />
                                            </Tag>
                                        )
                                    )}
                                </HStack>
                                <HStack gap={8}>
                                    <ButtonGroup>
                                        <Button
                                            p={8}
                                            className="submitButton"
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
                                            className="submitButton"
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

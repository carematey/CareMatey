import { AddIcon } from '@chakra-ui/icons';
import {
    ChakraProps,
    Card,
    Heading,
    Text,
    Tag,
    Wrap,
    WrapItem,
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    ModalHeader,
    ModalFooter,
    ModalOverlay,
    HStack,
    Center,
    Input,
    Textarea,
    Button,
    VStack,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import React from 'react';
import theme from '../theme';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { motion } from 'framer-motion';

interface InfoCardProps extends ChakraProps {
    text?: string;
    title?: string;
    tags?: string[];
    date?: Date;
    toCreate?: Boolean;
    spaceId?: number;
    spaceName?: string | null | undefined;
    recommendations?: any;
    setRecommendations?: any;
    handleSubmission?: any;
}

const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const {
        spaceId,
        tags,
        text,
        title,
        date,
        recommendations,
        setRecommendations,
        handleSubmission,
        toCreate,
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

    const dt = { time: date };
    const updatedTime = new Date(dt!.time!).toLocaleDateString();

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
    const Tags = ({ tagSize }: { tagSize: string }) => (
        <Wrap spacing={2} m={0} p={0} alignSelf={'flex-start'}>
            {tags?.map((tag, index) => (
                <WrapItem key={index}>
                    <Tag
                        p={1}
                        textOverflow={'ellipsis'}
                        whiteSpace={'nowrap'}
                        overflow={'hidden'}
                        size={tagSize}
                        bg={theme.colors.brand.blue.lite}
                        color={'white'}
                    >
                        {tag.toString().toUpperCase()}
                    </Tag>
                </WrapItem>
            ))}
        </Wrap>
    );

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
                maxW={toCreate ? 'unset' : '300px'}
            >
                {!toCreate ? (
                    <>
                        <Heading color={theme.colors.brand.blue.dark}>
                            {title}
                        </Heading>
                        <Text color={theme.colors.brand.blue.main}>
                            {/* {text} */}
                            {text != undefined && text.length > 90
                                ? text.slice(0, 90) + '...'
                                : text}
                        </Text>
                        <Tags tagSize={'sm'} />
                    </>
                ) : (
                    <>
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
                                <Text textAlign={'center'}>
                                    Create a new card
                                </Text>
                            </VStack>
                        </MotionCenter>
                    </>
                )}
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={'white'}>
                    {!toCreate ? (
                        <>
                            <ModalHeader>{title}</ModalHeader>
                            <ModalBody>{text}</ModalBody>
                            <ModalFooter>
                                <HStack
                                    justifyContent={'space-between'}
                                    alignItems={'flex-start'}
                                    w={'100%'}
                                >
                                    <Tags tagSize={'lg'} />
                                    <Text minW="10ch">
                                        <>
                                            Last Updated
                                            <br />
                                            {updatedTime}
                                        </>
                                    </Text>
                                </HStack>
                            </ModalFooter>
                        </>
                    ) : (
                        <>
                            <ModalHeader>
                                {true // @todo: use isOwner
                                    ? 'Create a new card'
                                    : 'Suggest a new card'}
                            </ModalHeader>
                            <ModalBody>
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
                                            value={newTag}
                                            onChange={(e) =>
                                                setNewTag(e.target.value)
                                            }
                                            placeholder="Tags"
                                        />
                                        <InputRightElement>
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setNewCardValues({
                                                        ...newCardValues,
                                                        tags: [
                                                            ...newCardValues.tags,
                                                            newTag,
                                                        ],
                                                    });
                                                    setNewTag('');
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <HStack alignSelf={'flex-start'}>
                                        {newCardValues.tags.map(
                                            (tag: string, idx: number) => (
                                                <Tag
                                                    colorScheme={'twitter'}
                                                    key={idx}
                                                >
                                                    {tag}
                                                </Tag>
                                            )
                                        )}
                                    </HStack>
                                    <Button
                                        onClick={(e) => {
                                            onClose();
                                            handleSubmission(newCardValues);
                                            handleAI();
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </VStack>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
export default InfoCard;

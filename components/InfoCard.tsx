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
import { useSession } from 'next-auth/react';

interface InfoCardProps extends ChakraProps {
    text?: string;
    title?: string;
    tags?: string[];
    date?: Date;
    toCreate?: Boolean;
    spaceId?: number;
    spaceName?: string;
    mutate?: any;
    recommendations?: any;
    setRecommendations?: any;
}

const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const {
        spaceId,
        mutate,
        tags,
        text,
        title,
        date,
        recommendations,
        setRecommendations,
        toCreate,
        spaceName,
        ...rest
    } = props;
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

    const { data: session } = useSession();
    const handleSubmission = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
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
        onClose();
        const data = await res.json();
        mutate();

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

    const dt = { time: date };
    const updatedTime = new Date(dt!.time!).toLocaleDateString();

    const Tags = ({ tagSize }: { tagSize: string }) => (
        <Wrap spacing={2}>
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
                bg={'white'}
                rounded={'md'}
                boxShadow={'inner'}
                cursor={'pointer'}
                onClick={onOpen}
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
                        <Center my={'auto'}>
                            <AddIcon color="#bbb" boxSize={10} />
                        </Center>
                        <Text textAlign={'center'}>Create a new card</Text>
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
                                    w={'100%'}
                                >
                                    <Text minW="13ch">
                                        <>
                                            Last Updated
                                            <br />
                                            {updatedTime}
                                        </>
                                    </Text>
                                    <Tags tagSize={'lg'} />
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
                                            console.log('submitted!');
                                            handleSubmission(e);
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

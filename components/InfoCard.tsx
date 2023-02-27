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
} from '@chakra-ui/react';
import React from 'react';
import theme from '../pages/theme';

interface InfoCardProps extends ChakraProps {
    text?: string;
    title?: string;
    tags?: string[];
    date?: Date;
    toCreate: Boolean;
}

const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const { tags, text, title, date, toCreate, ...rest } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const dt = { time: date };
    const updatedTime = new Date(dt.time).toLocaleDateString();

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
                                        Last Updated
                                        <br />
                                        {updatedTime}
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
                                    <Input placeholder="Title" isRequired />

                                    <Textarea
                                        placeholder="Instruction content"
                                        isRequired
                                    />
                                    <Input placeholder="Tags" />
                                    <Button
                                        onClick={(e) => {
                                            console.log('submitted nothing!');
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

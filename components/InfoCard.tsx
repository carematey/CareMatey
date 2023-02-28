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
} from '@chakra-ui/react';
import React from 'react';
import theme from '../pages/theme';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

interface InfoCardProps extends ChakraProps {
    text?: string;
    title?: string;
    tags?: string[];
    date: string;
}

const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const { tags, text, title, date, ...rest } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const c = { time: date };
    const updatedTime = new Date(c.time).toLocaleDateString();

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
                <Heading color={theme.colors.brand.blue.dark}>{title}</Heading>
                {text && (
                    <ReactMarkdown
                        components={ChakraUIRenderer(theme.markdown)}
                    >
                        {text != undefined && text.length > 90
                            ? text.slice(0, 90) + '...'
                            : text}
                    </ReactMarkdown>
                )}
                <Tags tagSize={'sm'} />
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={'white'}>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>
                        {text && (
                            <ReactMarkdown components={ChakraUIRenderer()}>
                                {text}
                            </ReactMarkdown>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <HStack justifyContent={'space-between'} w={'100%'}>
                            <Text minW="13ch">
                                Last Updated
                                <br />
                                {updatedTime}
                            </Text>
                            <Tags tagSize={'lg'} />
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
export default InfoCard;

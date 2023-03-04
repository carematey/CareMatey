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
import theme from '../theme';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Tags from './Tags';

interface InfoCardProps extends ChakraProps {
    text?: string;
    title?: string;
    tags?: string[];
    date?: Date;
    spaceId?: number;
    spaceName?: string | null | undefined;
}

const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const { spaceId, tags, text, title, date, spaceName, ...rest } = props;
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
                <Heading color={theme.colors.brand.blue.dark}>{title}</Heading>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {text != undefined && text.length > 90
                        ? text.slice(0, 90) + '...'
                        : (text as string)}
                </ReactMarkdown>
                <Tags tags={tags} tagSize={'sm'} />
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={'white'}>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {text as string}
                        </ReactMarkdown>
                    </ModalBody>
                    <ModalFooter>
                        <HStack
                            justifyContent={'space-between'}
                            alignItems={'flex-start'}
                            w={'100%'}
                        >
                            <Tags tags={tags} tagSize={'lg'} />
                            <Text minW="10ch">
                                <>
                                    Last Updated
                                    <br />
                                    {updatedTime}
                                </>
                            </Text>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
export default InfoCard;

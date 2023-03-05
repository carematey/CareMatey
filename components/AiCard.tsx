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
    Button,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import theme from '../theme';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Tags from './Tags';

interface AiCardProps extends ChakraProps {
    text?: string;
    title?: string;
    tags?: string[];
    date?: Date;
    spaceId?: number;
    spaceName?: string | null | undefined;
    recommendations: {
        title: string;
        text: string;
        tags: string[];
    }[];
    recommendation: {
        title: string;
        text: string;
        tags: string[];
    };
    setRecommendations: React.Dispatch<
        React.SetStateAction<
            {
                title: string;
                text: string;
                tags: string[];
            }[]
        >
    >;
    handleSubmission: (recommendation: {
        title: string;
        text: string;
        tags: string[];
    }) => void;
}

const AiCard: React.FC<AiCardProps> = (props): JSX.Element => {
    const {
        spaceId,
        tags,
        text,
        title,
        date,
        spaceName,
        recommendation,
        recommendations,
        handleSubmission,
        setRecommendations,
        ...rest
    } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const dt = { time: date };
    const updatedTime = new Date(dt!.time!).toLocaleDateString();

    return (
        <>
            <VStack
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
                <Card
                    p={4}
                    h={'100%'}
                    w={'100%'}
                    maxW={{ base: 'inherit', md: '300px' }}
                    justifyContent={'space-between'}
                    justifySelf={'center'}
                >
                    <Heading color={theme.colors.brand.blue.dark}>
                        {title}
                    </Heading>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {text != undefined && text.length > 90
                            ? text.slice(0, 90) + '...'
                            : (text as string)}
                    </ReactMarkdown>
                    <Tags tags={tags} tagSize={'sm'} />
                </Card>
                <ButtonGroup alignSelf={'flex-end'} p={4}>
                    {/* save and cancel buttons */}
                    <Button
                        colorScheme="blue"
                        onClick={() => {
                            handleSubmission({
                                title: recommendation.title,
                                text: recommendation.text,
                                tags: recommendation.tags,
                            });
                            setRecommendations(
                                recommendations?.filter(
                                    (rec: any) =>
                                        rec.title !== recommendation.title
                                )
                            );
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() =>
                            setRecommendations(
                                recommendations.filter(
                                    (rec: any) =>
                                        rec.title !== recommendation.title
                                )
                            )
                        }
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </VStack>
        </>
    );
};
export default AiCard;

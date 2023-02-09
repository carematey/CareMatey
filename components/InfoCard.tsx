import {
    ChakraProps,
    Card,
    Heading,
    Text,
    Tag,
    TagLabel,
    HStack,
} from '@chakra-ui/react';
import React from 'react';

interface InfoCardProps extends ChakraProps {
    text?: string;
    title?: string;
    category?: string;
    tags?: string[];
}

const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const { category, tags, text, title, ...rest } = props;
    return (
        <>
            <Card p={3} {...rest}>
                <Heading>{title}</Heading>
                <Text>{text}</Text>
                <HStack spacing={4}>
                    {tags?.map((tag) => (
                        <Tag size={'sm'} key={tag} colorScheme="teal">
                            {tag.toString().toUpperCase()}
                        </Tag>
                    ))}
                </HStack>
            </Card>
        </>
    );
};
export default InfoCard;

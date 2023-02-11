import {
    ChakraProps,
    Card,
    Heading,
    Text,
    Tag,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import theme from '../pages/theme';

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
            <Card
                p={4}
                {...rest}
                bg={'white'}
                rounded={'3xl'}
                boxShadow={'inner'}
            >
                <Heading color={theme.colors.brand.blue.dark}>{title}</Heading>
                <Text color={theme.colors.brand.blue.main}>{text}</Text>
                <Wrap spacing={2}>
                    {tags?.map((tag) => (
                        <WrapItem key={tag}>
                            <Tag
                                p={1}
                                textOverflow={'ellipsis'}
                                whiteSpace={'nowrap'}
                                overflow={'hidden'}
                                size={'sm'}
                                bg={theme.colors.brand.blue.lite}
                                color={'white'}
                            >
                                {tag.toString().toUpperCase()}
                            </Tag>
                        </WrapItem>
                    ))}
                </Wrap>
            </Card>
        </>
    );
};
export default InfoCard;

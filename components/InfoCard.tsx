import { ChakraProps, Card, Heading, Text } from '@chakra-ui/react';
import React from 'react';

interface InfoCardProps extends ChakraProps {
    text?: string;
    title?: string;
    category?: string;
}

const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const { category, text, title, ...rest } = props;
    return (
        <>
            <Card p={3} className={category} {...rest}>
                <Heading>{title}</Heading>
                <Text>{text}</Text>
            </Card>
        </>
    );
};
export default InfoCard;

import { ChakraProps, Card, Heading, Text } from '@chakra-ui/react';
import React from 'react';

interface InfoCardProps extends ChakraProps {
    text?: string;
    title?: string;
    category?: string;
    key?: any;
}

const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const { key, category, text, title, ...rest } = props;
    return (
        <>
            <Card p={3} id={key} className={category}>
                <Heading>{title}</Heading>
                <Text>{text}</Text>
            </Card>
        </>
    );
};
export default InfoCard;

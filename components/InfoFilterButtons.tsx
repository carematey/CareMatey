import { ChakraProps, Text, Button } from '@chakra-ui/react';
import React from 'react';

interface InfoFilterButtonsProps extends ChakraProps {
    category?: string;
    key?: string;
}

const InfoFilterButtons: React.FC<InfoFilterButtonsProps> = (
    props
): JSX.Element => {
    const { key, category, ...rest } = props;
    return (
        <Button key={key} w="6rem" {...rest}>
            {category}
        </Button>
    );
};
export default InfoFilterButtons;

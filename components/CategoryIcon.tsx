import {
    Square,
    Text,
    Center,
    VStack,
    Image,
    Avatar,
    WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import {
    FaAddressCard,
    FaBaby,
    FaCat,
    FaDog,
    FaHome,
    FaKiwiBird,
} from 'react-icons/fa';

type Props = {
    categoryName: string;
    categoryId: number;
    category?: string;
    src?: string;
};

export default function CategoryIcon({
    categoryName,
    categoryId,
    src,
    category,
}: Props) {
    const defaultCategories = ['home', 'emergency'];

    const IconImage = () => {
        switch (category || categoryName) {
            case 'cat':
                return <FaDog />;
            case 'dog':
                return <FaCat />;
            case 'baby':
                return <FaBaby />;
            case 'bird':
                return <FaKiwiBird />;
            case 'home':
                return <FaHome />;
            case 'emergency':
                return <FaAddressCard />;
            default:
                return <></>;
        }
    };

    return (
        <Avatar
            icon={<IconImage />}
            iconLabel={categoryName}
            name={defaultCategories.includes(categoryName) ? '' : categoryName}
            src={src}
            onClick={() => console.log(categoryId)}
            cursor={'pointer'}
            size={'lg'}
        />
    );
}

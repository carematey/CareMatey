import { Square, Text, Center, VStack } from '@chakra-ui/react';
import React from 'react';
import {
    FaAccessibleIcon,
    FaAddressCard,
    FaBaby,
    FaBath,
    FaBed,
    FaBone,
    FaCar,
    FaCat,
    FaCouch,
    FaDog,
    FaDoorOpen,
    FaDragon,
    FaFireExtinguisher,
    FaFish,
    FaHeart,
    FaLaptop,
    FaLock,
    FaMedkit,
    FaPhone,
    FaPills,
    FaPoop,
    FaRunning,
    FaSink,
    FaTrash,
    FaTv,
    FaVideo,
    FaVolumeUp,
    FaWifi,
} from 'react-icons/fa';

type Props = {
    categoryName: string;
    icon?: string;
};

export default function CategoryIcon({ categoryName }: Props) {
    const abbreviatedCategory = (categoryName: string) => {
        const words = categoryName.split(' ');
        return words.map((word) => word.charAt(0).toUpperCase());
    };

    return (
        <Square
            size={'90px'}
            border={'2px solid black'}
            onClick={() => console.log(categoryName)}
            cursor={'pointer'}
        >
            <Center>
                <VStack>
                    {/* @Todo make these icons work when the client wants them to */}
                    {/* <FaDog />
                    <FaCat />
                    <FaPhone />
                    <FaAccessibleIcon />
                    <FaWifi />
                    <FaAddressCard />
                    <FaBaby />
                    <FaBath />
                    <FaHeart />
                    <FaCar />
                    <FaTrash />
                    <FaVolumeUp />
                    <FaVideo />
                    <FaFish />
                    <FaFireExtinguisher />
                    <FaPoop />
                    <FaBone />
                    <FaCouch />
                    <FaBed />
                    <FaTv />
                    <FaMedkit />
                    <FaPills />
                    <FaDoorOpen />
                    <FaRunning />
                    <FaDragon />
                    <FaLock />
                    <FaSink />
                    <FaLaptop /> */}

                    <Text>{abbreviatedCategory(categoryName)}</Text>
                    <Text textAlign={'center'}>{categoryName}</Text>
                </VStack>
            </Center>
        </Square>
    );
}

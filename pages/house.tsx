import { Container, Text, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import InfoCardCollection from '../components/InfoCardCollection';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { useSession } from 'next-auth/react';

const House = () => {
    const { data: session } = useSession();

    const {
        data: user,
        error: userError,
        isLoading: isUserLoading,
    } = useSWR(session && `/api/users/${session?.user?.email}`, fetcher);

    const {
        data: home,
        error: homeError,
        isLoading: isHomeLoading,
    } = useSWR(user?.id && `/api/homes/${user?.id}`, fetcher);

    const [selectedHome, setSelectedHome] = useState(null);

    function handleSelectChange(e) {
        setSelectedHome(e.target.value);
    }

    const {
        data: card,
        error: cardDataError,
        isLoading: isCardDataLoading,
    } = useSWR(selectedHome && `/api/cards/${selectedHome}`, fetcher);

    return (
        <Container>
            {session && <Text>Welcome {user?.email}</Text>}
            <Select placeholder="Select Home" onChange={handleSelectChange}>
                {home?.map((house: any) => {
                    return (
                        <option key={house.index} value={house.id}>
                            {house.name}
                        </option>
                    );
                })}
            </Select>
            <InfoCardCollection
                data={card}
                isLoading={isHomeLoading || !selectedHome}
            />
        </Container>
    );
};

export default House;

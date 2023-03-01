import { Container, Text, Select } from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
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
        data: spaces,
        error: spaceError,
        isLoading: isSpaceLoading,
    } = useSWR(user?.id && `/api/homes/${user?.id}`, fetcher);

    const [selectedSpace, setSelectedSpace] = useState('');

    function handleSelectChange(e : React.ChangeEvent<HTMLSelectElement>) {
        setSelectedSpace(e.target.value);
    }

    const {
        data: card,
        error: cardDataError,
        isLoading: isCardDataLoading,
    } = useSWR(selectedSpace && `/api/cards/${selectedSpace}`, fetcher);

    return (
        <Container>
            {session && <Text>Welcome {user?.email}</Text>}
            <Select placeholder="Select Space" onChange={handleSelectChange}>
                {spaces?.map((space: any) => {
                    return (
                        <option key={space.index} value={space.id}>
                            {space.name}
                        </option>
                    );
                })}
            </Select>
            <InfoCardCollection
                data={card}
                isLoading={isSpaceLoading || !selectedSpace}
            />
        </Container>
    );
};

export default House;

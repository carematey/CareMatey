import { Sidebar } from './../components/Sidebar';
import { Container, Divider, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import InfoCardCollection from '../components/InfoCardCollection';
import { useSession } from 'next-auth/react';

const Space = () => {
    const { data: session } = useSession();

    const [selectedSpaceId, setSelectedSpaceId] = React.useState<number | null>(
        null
    );

    return (
        <Container maxW={'100%'}>
            {session ? (
                <>
                    <HStack width={'100%'}>
                        <Sidebar
                            selectedSpaceId={selectedSpaceId}
                            setSelectedSpaceId={setSelectedSpaceId}
                        />
                        <Divider
                            display={{ base: 'none', md: 'block' }}
                            orientation="vertical"
                            borderColor={'black'}
                            h={'calc(min(750px, calc(100vh - 100px)))'}
                        />
                        {selectedSpaceId && (
                            <InfoCardCollection spaceId={selectedSpaceId} />
                        )}
                    </HStack>
                </>
            ) : (
                <Text>Please login</Text>
            )}
        </Container>
    );
};

export default Space;

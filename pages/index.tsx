import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect } from 'react';
import Navbar from '../components/navbar';
import useUser from '../hooks/useUser';

const LandingPage = () => {
    const bg = useColorModeValue('gray.50', 'gray.800');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const { user, mutate, loggedOut } = useUser();

    // if logged in, redirect to the dashboard

    return (
        <Box bg={bg}>
            <Navbar />
            <Flex justify="center" align="center" h="100vh">
                <Container maxW="container.lg">
                    <Stack
                        direction={['column', 'column', 'row', 'row']}
                        spacing={4}
                        align="center"
                        justify="space-between"
                    >
                        <Box textAlign="center">
                            <Box
                                width={'fit-content'}
                                margin={{ base: 'auto', md: 'unset' }}
                            >
                                <Image
                                    width={300}
                                    height={150}
                                    src="/images/dalle.png"
                                    alt="Logo"
                                />
                            </Box>

                            <Heading
                                size="lg"
                                mb={4}
                                whiteSpace={'pre-wrap'}
                                textAlign={{ base: 'center', md: 'left' }}
                            >
                                Welcome to [App Name]
                            </Heading>

                            <Text
                                fontSize="lg"
                                color={textColor}
                                mb={8}
                                textAlign={{ base: 'center', md: 'left' }}
                                whiteSpace={'pre-wrap'}
                            >
                                The website that simplifies house and pet
                                sitting!
                            </Text>

                            <Button
                                size="lg"
                                colorScheme="purple"
                                mb={4}
                                float={{ base: 'unset', md: 'left' }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box mb={8}>
                            <Image
                                width={400}
                                height={600}
                                src="/images/landing1.png"
                                alt="Pet sitting"
                            />
                        </Box>
                    </Stack>
                </Container>
            </Flex>

            <Box bg="purple.600" py={8}>
                <Container maxW="container.lg">
                    <Stack
                        direction={['column', 'column', 'row', 'row']}
                        spacing={8}
                        align="center"
                        justify="space-between"
                    >
                        <Box textAlign={['center', 'center', 'left', 'left']}>
                            <Heading size="md" color="white" mb={4}>
                                For House and Pet Sitters
                            </Heading>

                            <Text fontSize="lg" color="white" mb={4}>
                                [Website Name] is an easy-to-use platform that
                                keeps all your house and pet sitting
                                responsibilities in one convenient place. With
                                important details about the home, pets, and
                                plants easily accessible, you can provide
                                top-quality care with peace of mind.
                            </Text>

                            <Button
                                size="md"
                                colorScheme="whiteAlpha"
                                variant="outline"
                                mb={4}
                            >
                                Learn More
                            </Button>
                        </Box>

                        <Box mb={8}>
                            <Image
                                width={600}
                                height={400}
                                src="/images/landing1.png"
                                alt="House sitting"
                            />
                        </Box>
                    </Stack>
                </Container>
            </Box>

            <Box bg="gray.100" py={8}>
                <Container maxW="container.lg">
                    <Stack
                        direction={['column', 'column', 'row', 'row']}
                        spacing={8}
                        align="center"
                        justify="space-between"
                    >
                        <Box mb={8}>
                            <Image
                                width={600}
                                height={400}
                                src="/images/landing1.png"
                                alt="Homeowner"
                            />
                        </Box>

                        <Box textAlign={['center', 'center', 'left', 'left']}>
                            <Heading size="md" color={textColor} mb={4}>
                                For Homeowners
                            </Heading>

                            <Text fontSize="lg" color={textColor} mb={4}>
                                For homeowners, [Website Name] provides a simple
                                and effective solution to ensure their home and
                                pets are well cared for while they're away. Our
                                user-friendly interface makes it easy to share
                                important details with their house or pet
                                sitter, including emergency contacts, feeding
                                schedules, and more.
                            </Text>
                            <Button size="md" colorScheme="purple" mb={4}>
                                Sign Up Today!
                            </Button>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            <Box bg="purple.600" py={8}>
                <Container maxW="container.lg">
                    <Stack
                        direction={['column', 'column', 'row', 'row']}
                        spacing={8}
                        align="center"
                        justify="space-between"
                    >
                        <Box textAlign={['center', 'center', 'left', 'left']}>
                            <Heading size="md" color="white" mb={4}>
                                Experience Peace of Mind
                            </Heading>

                            <Text fontSize="lg" color="white" mb={4}>
                                Sign up for [Website Name] today and start
                                experiencing the peace of mind that comes with a
                                well-cared-for home and happy pets! And stay
                                tuned - we'll be launching our mobile app soon,
                                so you can access all the great features of
                                [Website Name] on-the-go.
                            </Text>

                            <Button
                                size="md"
                                colorScheme="whiteAlpha"
                                variant="outline"
                                mb={4}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box mb={8}>
                            <Image
                                width={400}
                                height={600}
                                src="/images/landing1.png"
                                alt="Happy pets"
                            />
                        </Box>
                    </Stack>
                </Container>
            </Box>

            <Box bg="gray.50" py={8}>
                <Container maxW="container.lg">
                    <Stack
                        direction={['column', 'column', 'row', 'row']}
                        spacing={8}
                        align="center"
                        justify="center"
                    >
                        <Text fontSize="sm" color={textColor}>
                            Copyright © {new Date().getFullYear()}
                        </Text>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;

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
import { motion } from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LandingPage = () => {
    const bg = useColorModeValue('gray.50', 'gray.800');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const { data: session } = useSession();
    const router = useRouter();
    const MotionBox = motion(Box);

    // if logged in, redirect to the dashboard
    useEffect(() => {
        if (session?.user) {
            router.replace('/dashboard');
        }
    }, [session, router]);

    return (
        <Box bg={bg} overflowY={'hidden'}>
            <Flex
                justify="center"
                align="center"
                h={{ base: '110vh', md: '100vh' }}
            >
                <Container maxW="container.lg">
                    <Stack
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={4}
                        align="center"
                        justify="space-between"
                    >
                        <MotionBox
                            textAlign="center"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            <Heading
                                size="lg"
                                mb={4}
                                whiteSpace={'pre-wrap'}
                                textAlign={{ base: 'center', md: 'left' }}
                                w={{ base: '90%', md: '450px' }}
                            >
                                Flexible task management software for teams and
                                individuals.
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
                                colorScheme="blue"
                                mb={4}
                                float={{ base: 'unset', md: 'left' }}
                                onClick={() => signIn()}
                            >
                                Sign Up
                            </Button>
                        </MotionBox>

                        <MotionBox
                            mb={8}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            pb={{ base: 80, md: 0 }}
                            zIndex={10}
                            pos={'relative'}
                            width={'100%'}
                            height={'400px'}
                            maxW={'500px'}
                        >
                            <Image
                                fill
                                src="/images/cute.jpg"
                                alt="Pet sitting"
                            />
                        </MotionBox>
                    </Stack>
                </Container>
            </Flex>

            <MotionBox bg="blue.600" py={24}>
                <Container maxW="container.lg">
                    <Stack
                        direction={['column', 'column', 'row', 'row']}
                        spacing={8}
                        align="center"
                        justify="space-between"
                    >
                        <MotionBox
                            textAlign={['center', 'center', 'left', 'left']}
                            maxW={'700px'}
                            initial={{ x: -200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                        >
                            <Heading size="md" color="white" mb={4}>
                                For House and Pet Sitters
                            </Heading>

                            <Text
                                mx={{ base: 'auto', md: 'unset' }}
                                fontSize="lg"
                                whiteSpace={'pre-wrap'}
                                color="white"
                                mb={4}
                                maxW={{ base: '90%', md: '450px' }}
                            >
                                Care Matey is an easy-to-use platform that keeps
                                all your house and pet sitting responsibilities
                                in one convenient place. With important details
                                about the home, pets, and plants easily
                                accessible, you can provide top-quality care
                                with peace of mind.
                            </Text>

                            <Button
                                size="md"
                                colorScheme="blue"
                                variant="outline"
                                mb={4}
                            >
                                Learn More
                            </Button>
                        </MotionBox>

                        <MotionBox
                            mb={8}
                            initial={{ x: 200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                            width={'100%'}
                            height={'400px'}
                            maxW={'500px'}
                        >
                            <Image
                                width={600}
                                height={400}
                                src="/images/landing_1.jpg"
                                alt="House sitting"
                            />
                        </MotionBox>
                    </Stack>
                </Container>
            </MotionBox>

            <MotionBox bg="blue.600">
                <Container px={0} mx={'0 !important'} minW={'100%'}>
                    <MotionBox
                        initial={{ x: 200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        pos="relative"
                        w={'100%'}
                        minW={'100% !important'}
                        zIndex={10}
                        height={{ base: 'auto', md: '300px' }}
                    >
                        <Image
                            fill
                            src="/images/landing1.png"
                            alt="Happy pets"
                        />
                    </MotionBox>
                </Container>
            </MotionBox>

            <MotionBox bg="gray.100" py={24}>
                <Container maxW="container.lg">
                    <Stack
                        direction={['column', 'column', 'row', 'row']}
                        spacing={8}
                        align="center"
                        justify="space-between"
                    >
                        <MotionBox
                            mb={8}
                            maxW={{ base: '90%', md: '450px' }}
                            initial={{ x: -40, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                        >
                            <Image
                                width={600}
                                height={400}
                                src="/images/team.jpg"
                                alt="Homeowner"
                            />
                        </MotionBox>

                        <MotionBox
                            textAlign={['center', 'center', 'left', 'left']}
                            maxW={{ base: '90%', md: '450px' }}
                            initial={{ x: 40, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                        >
                            <Heading size="md" color={textColor} mb={4}>
                                For Homeowners
                            </Heading>

                            <Text
                                fontSize="lg"
                                whiteSpace={'pre-wrap'}
                                color={textColor}
                                mb={4}
                            >
                                For homeowners, Care Matey provides a simple and
                                effective solution to ensure their home and pets
                                are well cared for while they&apos;re away. Our
                                user-friendly interface makes it easy to share
                                important details with their house or pet
                                sitter, including emergency contacts, feeding
                                schedules, and more.
                            </Text>
                            <Button
                                size="md"
                                colorScheme="blue"
                                mb={4}
                                onClick={() => signIn()}
                            >
                                Sign Up Today!
                            </Button>
                        </MotionBox>
                    </Stack>
                </Container>
            </MotionBox>

            <MotionBox bg="blue.600" py={24}>
                <Container maxW="container.lg">
                    <Stack
                        direction={['column', 'column', 'row', 'row']}
                        spacing={8}
                        align="center"
                        justify="space-between"
                    >
                        <MotionBox
                            textAlign={['center', 'center', 'left', 'left']}
                            initial={{ x: -200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                            maxW={{ base: '90%', md: '450px' }}
                        >
                            <Heading size="md" color="white" mb={4}>
                                Experience Peace of Mind
                            </Heading>

                            <Text
                                fontSize="lg"
                                whiteSpace={'pre-wrap'}
                                color="white"
                                mb={4}
                            >
                                Sign up for Care Matey today and start
                                experiencing the peace of mind that comes with a
                                well-cared-for home and happy pets! And stay
                                tuned - we&apos;ll be launching our mobile app
                                soon, so you can access all the great features
                                of Care Matey on-the-go.
                            </Text>

                            <Button
                                size="md"
                                colorScheme="blue"
                                variant="outline"
                                mb={4}
                                onClick={() => signIn()}
                            >
                                Sign Up
                            </Button>
                        </MotionBox>

                        <MotionBox
                            maxW={{ base: '90%', md: '450px' }}
                            mb={8}
                            initial={{ x: 200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                        >
                            <Image
                                width={400}
                                height={600}
                                src="/images/huh.jpg"
                                alt="Happy pets"
                            />
                        </MotionBox>
                    </Stack>
                </Container>
            </MotionBox>

            <MotionBox
                bg="gray.50"
                py={8}
                // add easing
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
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
            </MotionBox>
        </Box>
    );
};

export default LandingPage;

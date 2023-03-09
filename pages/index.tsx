import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue,
    useMediaQuery,
} from '@chakra-ui/react';
import {
    motion,
    useScroll,
    useTransform,
    useViewportScroll,
} from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LandingPage = () => {
    const [isLargeScreen] = useMediaQuery('(min-width: 992px)');
    const { scrollYProgress } = useViewportScroll();
    const { scrollYProgress: scrollYSection2 } = useScroll();
    const xPosition = useTransform(
        scrollYProgress,
        isLargeScreen ? [0, 0.35, 0.45] : [0, 0.25, 0.3],
        [900, 0, 0]
    );
    const xPositionText = useTransform(
        scrollYProgress,
        isLargeScreen ? [0, 0.35, 0.45] : [0, 0.25, 0.3],
        [-900, 0, 0]
    );
    const xPosition2 = useTransform(
        scrollYSection2,
        isLargeScreen
            ? [0, 0.2, 0.35, 0.4, 0.5, 1]
            : [0, 0.1, 0.2, 0.35, 0.4, 1],
        [1800, 1800, 1000, 700, 0, 0]
    );

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
                className="landing-page-section-1"
                justify="center"
                align="center"
                h={{ base: '95vh', md: '100vh' }}
            >
                <Container maxW="container.lg">
                    <Stack
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={4}
                        align="center"
                        justify="space-between"
                        pos={'relative'}
                        zIndex={1}
                    >
                        <MotionBox
                            textAlign="center"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.1,
                                ease: 'easeInOut',
                            }}
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
                            <MotionBox
                                initial={{
                                    y: -80,
                                    opacity: -1,
                                    zIndex: -1,
                                }}
                                animate={{ y: 0, opacity: 1, zIndex: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.25,
                                    ease: 'easeInOut',
                                }}
                            >
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
                            </MotionBox>

                            <MotionBox
                                initial={{
                                    x: 880,
                                    zIndex: -5,
                                    opacity: 0,
                                }}
                                animate={{ x: 0, opacity: 1, zIndex: 0 }}
                                transition={{
                                    duration: 1.1,
                                    delay: 0.45,
                                    ease: 'easeInOut',
                                }}
                            >
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
                        </MotionBox>

                        <MotionBox
                            mb={8}
                            initial={{
                                x: 800,
                                opacity: 0,
                            }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                            pb={{ base: 80, md: 0 }}
                            zIndex={10}
                            pos={'relative'}
                            width={'100%'}
                            height={{ base: '400px', md: '700px' }}
                            maxW={{ base: '270px', md: '550px' }}
                        >
                            <Image
                                className="right-arrow-path"
                                fill
                                src="/images/team.jpg"
                                alt="Pet sitting"
                            />
                        </MotionBox>
                    </Stack>
                </Container>
            </Flex>

            <MotionBox bg="blue.600" pb={0} pt={16}>
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
                            style={{ x: xPositionText }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{
                                duration: 0.5,
                            }}
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

                            {/* 
                            hide button until we have an about page 
                            <Button size="md" colorScheme="teal" mb={4}>
                                Learn More
                            </Button> */}
                        </MotionBox>

                        <MotionBox
                            mb={8}
                            style={
                                isLargeScreen
                                    ? { y: xPosition }
                                    : { x: xPosition }
                            }
                            width={'100%'}
                            height={'400px'}
                            maxW={'500px'}
                        >
                            <Image
                                className="trapezoid-path"
                                width={600}
                                height={400}
                                src="/images/landing_1.jpg"
                                alt="House sitting"
                            />
                        </MotionBox>
                    </Stack>
                </Container>
            </MotionBox>

            <MotionBox bg="blue.600" pt={4}>
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
                            style={{ y: xPosition2 }}
                        >
                            <Image
                                className="bevel-path"
                                width={600}
                                height={400}
                                src="/images/cute.jpg"
                                alt="Homeowner"
                            />
                        </MotionBox>

                        <MotionBox
                            textAlign={['center', 'center', 'left', 'left']}
                            maxW={{ base: '90%', md: '450px' }}
                            style={{ x: xPosition2 }}
                        >
                            <Heading size="md" color={'gray.200'} mb={4}>
                                For Homeowners
                            </Heading>

                            <Text
                                fontSize="lg"
                                whiteSpace={'pre-wrap'}
                                color={'gray.200'}
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
                            viewport={{ once: true, amount: 0.45 }}
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
                            viewport={{ once: true, amount: 0.45 }}
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
                viewport={{ once: true, amount: 0.45 }}
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

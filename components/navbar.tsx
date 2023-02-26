import {
    Box,
    Flex,
    Button,
    Text,
    Stack,
    useColorModeValue,
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Avatar,
    MenuItem,
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import SignInOutButton from './SignInOutButton';

const Navbar = () => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.700', 'white');
    const { data: session } = useSession();

    return (
        <Box
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.100', 'gray.900')}
            bg={bgColor}
            pos="sticky"
            top="0"
            zIndex="sticky"
        >
            <Flex
                alignItems="center"
                justifyContent="space-between"
                px={4}
                py={3}
                maxW="container.lg"
                mx="auto"
            >
                <Box>
                    <Text fontSize="xl" fontWeight="bold" color={textColor}>
                        [App Name]
                    </Text>
                </Box>
                <Stack direction="row" spacing={4}>
                    <Button colorScheme="purple" size="md">
                        Sign Up
                    </Button>
                    {!session ? (
                        <Button
                            colorScheme="gray"
                            size="md"
                            onClick={() => signIn()}
                        >
                            Sign in
                        </Button>
                    ) : (
                        <Menu>
                            <MenuButton
                                as={Avatar}
                                aria-label="Options"
                                icon={
                                    <Avatar src={session.user?.image || ''} />
                                }
                                variant="outline"
                            />
                            <MenuList>
                                <MenuItem onClick={() => signOut()}>
                                    {' '}
                                    Sign out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </Stack>
            </Flex>
        </Box>
    );
};

export default Navbar;

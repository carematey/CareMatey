import { ReactNode } from 'react';
import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { signIn, signOut, useSession } from 'next-auth/react';

const Links = [
    ['Home', ''],
    ['Contact', 'contact'],
];

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
    <Link
        p={4}
        px={5}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: '#eee',
        }}
        href={href}
    >
        {children}
    </Link>
);

const NavLinks = () => (
    <>
        {Links.map((linking: string[]) => (
            <NavLink key={linking[0]} href={linking[1]}>
                {linking[0]}
            </NavLink>
        ))}
    </>
);

export default function Navigation() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: session } = useSession();
    return (
        <>
            <Box
                boxShadow={'sm'}
                bg={'white'}
                px={4}
                position="sticky"
                top="0"
                zIndex={10}
            >
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <Image
                                boxSize={'50px'}
                                src="https://freevector-images.s3.amazonaws.com/uploads/vector/preview/31261/LiverBirdHead829.png"
                                alt="logo"
                            />
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}
                        >
                            <NavLinks />
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
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
                                            <Avatar
                                                src={session.user?.image || ''}
                                            />
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
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <NavLinks />
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}

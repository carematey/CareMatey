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
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import theme from '../pages/theme';

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
                        <Menu isLazy>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}
                            >
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                            </MenuButton>
                            <MenuList bg="whiteAlpha.900">
                                <MenuItem bg="none">Switch Homes</MenuItem>
                                <MenuDivider
                                    borderColor={theme.colors.brand.teal.lite}
                                />
                                <MenuItem bg="none">Account</MenuItem>
                                <MenuItem bg="none">Log Out</MenuItem>
                            </MenuList>
                        </Menu>
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

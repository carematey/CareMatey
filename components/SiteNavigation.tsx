import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Image,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import theme from '../pages/theme';

const Links = ['Home', 'Contact'];

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={3}
        py={2}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('#555', '#eee'),
        }}
        href={'#'}
    >
        {children}
    </Link>
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
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
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
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}

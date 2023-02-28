import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

const SignUp = () => {
    const [show, setShow] = React.useState<boolean>(false);
    const [login, setLogin] = React.useState<SignUpSchemaType>({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = React.useState<z.inferFlattenedErrors<
        typeof SignUpSchema
    > | null>(null);
    const handleClick = () => setShow(!show);

    const encryptPassword = async (password: string) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        console.log('🚀 ~ file: signUp.tsx:42 ~ encryptPassword ~ hash:', hash);
        return hash;
    };

    // use zod to verify email and password
    // use next-auth to sign up
    const handleSignUp = async (values: SignUpSchemaType) => {
        const parse = SignUpSchema.safeParse(values);
        if (parse.success) {
            if (values.password !== values.confirmPassword) {
                setErrors({
                    fieldErrors: {
                        password: ['passwords do not match'],
                        confirmPassword: ['passwords do not match'],
                    },
                    formErrors: [],
                });
                return;
            }
            const encryptedPass = await encryptPassword(values.password);
            // make a request to the backend to create a user
            const user = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: encryptedPass,
                }),
            });

            if (user.status === 200) {
                console.log('user created');
            } else {
                setErrors({
                    fieldErrors: {
                        email: ['email already exists'],
                    },
                    formErrors: [],
                });
            }
        } else {
            console.log(parse.error);
        }
    };
    return (
        <Flex
            width={'100%'}
            height={'100vh'}
            color={'black'}
            justify={'center'}
            alignItems={'center'}
        >
            <VStack p={8} bg={'gray.100'}>
                <Text>Welcome!</Text>
                <Divider borderColor={'black'} opacity={'0.3'} />
                <FormControl pt={2} isInvalid={!!errors?.fieldErrors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        _hover={{ borderColor: '#999999' }}
                        borderColor={'black'}
                        type="email"
                        onChange={(e) =>
                            setLogin({ ...login, email: e.target.value })
                        }
                    />
                    <FormErrorMessage>
                        {errors?.fieldErrors.email}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors?.fieldErrors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        _hover={{ borderColor: '#999999' }}
                        borderColor={'black'}
                        type={show ? 'text' : 'password'}
                        onChange={(e) =>
                            setLogin({ ...login, password: e.target.value })
                        }
                    />
                    <FormErrorMessage>
                        {errors?.fieldErrors.password}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors?.fieldErrors?.confirmPassword}>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                        <Input
                            _hover={{ borderColor: '#999999' }}
                            borderColor={'black'}
                            type={show ? 'text' : 'password'}
                            onChange={(e) =>
                                setLogin({
                                    ...login,
                                    confirmPassword: e.target.value,
                                })
                            }
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                        {errors?.fieldErrors.confirmPassword}
                    </FormErrorMessage>
                </FormControl>
                <Box alignSelf={'flex-end'} pt={4}>
                    <Button
                        colorScheme={'purple'}
                        p={4}
                        onClick={async (e) => {
                            e.preventDefault();
                            // filter empty values from formValues
                            const formData = await SignUpSchema.safeParseAsync(
                                login
                            );

                            if (formData.success === false) {
                                setErrors(formData?.error.flatten());
                            } else {
                                setErrors(null);
                                handleSignUp(login);
                            }
                        }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </VStack>
        </Flex>
    );
};

export default SignUp;

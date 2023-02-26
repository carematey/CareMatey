import { Button } from '@chakra-ui/react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function SignInOutButton() {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                <Button colorScheme="gray" size="md" onClick={() => signOut()}>
                    Sign out
                </Button>
            </>
        );
    }
    return (
        <>
            <Button colorScheme="gray" size="md" onClick={() => signIn()}>
                Sign in
            </Button>
        </>
    );
}

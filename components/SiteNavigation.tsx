import {
    Button,
    Stack,
    Center,
    Menu,
    Box,
    useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';

import Link from 'next/link';
import styles from './styles/navigation.module.css';

import theme from '../pages/theme';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import { Serializer } from 'v8';

type Props = {
    size: any;
};

export default function SiteNavigation({ size, ...rest }: Props) {
    const mobileIconSize = 6;
    return (
        <>
            <Stack
                className={styles.navigation}
                outline={theme.colors.brand.blue.lite + ' solid 1px'}
                zIndex={'overlay'}
                direction={['column-reverse', 'row']}
                {...rest}
            >
                <Link href="/">
                    <Button>
                        {size ? <CloseIcon boxSize={mobileIconSize} /> : 'Home'}
                    </Button>
                </Link>
                <Link href="#">
                    <Button>
                        {size ? <ChatIcon boxSize={mobileIconSize} /> : 'Chat'}
                    </Button>
                </Link>
            </Stack>
        </>
    );
}

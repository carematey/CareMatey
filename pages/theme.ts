import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: 'brand.blue',
            },
        },
    },
    colors: {
        brand: {
            yellow: '#FFC95C',
            blue: '#033F63',
            teal: '#28666E',
            robin: '#50C9CE',
        },
    },
});
export default theme;

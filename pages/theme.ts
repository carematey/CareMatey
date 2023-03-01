import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
const config: ThemeConfig = {
    initialColorMode: 'light',
};

const theme = extendTheme({
    styles: {
        global: {
            body: {
                // bg: 'brand.robin.lite',
                color: 'brand.blue.dark',
            },
        },
    },
    fonts: {
        mono: 'Menlo, monospace',
    },
    colors: {
        brand: {
            yellow: {
                lite: '#FFECBF',
                main: '#FFE78E',
            },
            blue: {
                lite: '#066F96',
                main: '#044F74',
                dark: '#022F52',
            },
            teal: {
                lite: '#30868F',
                main: '#28666E',
                dark: '#26464C',
            },
            robin: {
                lite: '#51D9DF',
                main: '#50C9CE',
                dark: '#40A7AF',
            },
        },
    },
});
export default theme;




import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    direction: 'rtl',
    palette: {
        background: {
            default: '#F2F2F2',
            paper: '#FFFFFF', // Equivalent to the 'box' color in your original theme
            header: '#212121',
            darkBlue: '#3A5DF0',
            dark: '#191717',
        },
        primary: {
            main: '#25277e',
            light: '#5d6bc4',
            dark: "#4749d2"
        },
        secondary: {
            main: '#FF7782',
        },
        text: {
            primary: '#6D6D6D',
            secondary: '#ffffff',
            card: '#49576A',
            main: '#6D6D6D',
        },
        action: {
            disabled: '#98A4B5',
        },
        icon: {
            primary: '#41669A',
        },
        divider: '#98A4B5',
        menu: {
            main: '#41669A',
            secondary: '#AFCEFC',
        },
        success: {
            main: '#2CC644',
        },
        warning: {
            main: '#FF5462',
            secondary: '#FE4A51',
        },
    },
    shape: {
        borderRadius: 10,
    },
});

export default theme;


export const center = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

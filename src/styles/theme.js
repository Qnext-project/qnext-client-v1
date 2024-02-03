// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//     direction: "rtl",
//     background: {
//         default: "#F5F6F8",
//         header: "#212121",
//         box: "#FFFFFF",
//         darkBlue: "#3A5DF0",
//         field: "#F2F2F2",
//         dark: "#191717",
//     },
//     palette: {
//         primary: {
//             main: "#45BFFF",
//             second: "#6cccff",
//         },
//         secondary: { main: "#FF7782" },

//         text: {
//             primary: "#FFFFFF",
//             secondary: "#345BFF",
//             card: "#49576A",
//             lightgray: "#C9D5E7",
//         },
//         disable: {
//             main: "#98A4B5",
//             secondary: "#6D6D6D",
//         },
//         darkBlue: { main: "#25277e", light: "#5d6bc4", dimBlue: "#4749d2" },
//         icon: {
//             primary: "#41669A",
//         },
//         divider: "#98A4B5",
//         menu: {
//             main: "#41669A",
//             secondary: "#AFCEFC",
//         },
//         green: {
//             main: "#2CC644",
//         },
//         warning: {
//             main: "#FF5462",
//             secondary: "#FE4A51",
//         },
//     },
//     typography: {
//         fontFamily: "IRANSansWeb",
//         color: "#6D6D6D",
//     },
//     shape: {
//         borderRadius: 10,
//         borderColor: "#DEDEDE",
//     },
// });

// export default theme;


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

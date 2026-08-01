import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        mode: "dark",

        primary: {
            main: "#2563EB"
        },

        secondary: {
            main: "#7C3AED"
        },

        background: {
            default: "#0F172A",
            paper: "#1E293B"
        },

        text: {
            primary: "#F8FAFC",
            secondary: "#CBD5E1"
        }

    },

    typography: {

        fontFamily: "'Inter', 'Roboto', sans-serif",

        h4: {
            fontWeight: 700
        },

        h5: {
            fontWeight: 600
        },

        button: {
            textTransform: "none",
            fontWeight: 600
        }

    },

    shape: {
        borderRadius: 12
    }

});

export default theme;
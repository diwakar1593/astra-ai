import {
    Box,
    Typography
} from "@mui/material";

export default function ChatWindow() {

    return (

        <Box

            sx={{

                flex: 1,

                display: "flex",

                justifyContent: "center",

                alignItems: "center"

            }}

        >

            <Typography
                variant="h4"
                color="text.secondary"
            >

                Welcome to Astra AI 🚀

            </Typography>

        </Box>

    );

}
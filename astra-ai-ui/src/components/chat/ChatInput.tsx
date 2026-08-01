import {
    Box,
    Button,
    TextField
} from "@mui/material";

export default function ChatInput() {

    return (

        <Box

            sx={{

                display: "flex",

                gap: 2,

                p: 2

            }}

        >

            <TextField

                fullWidth

                placeholder="Type your message..."

            />

            <Button

                variant="contained"

            >

                Send

            </Button>

        </Box>

    );

}
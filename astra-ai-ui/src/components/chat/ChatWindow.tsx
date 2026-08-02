import {
    Box,
    Paper,
    Typography
} from "@mui/material";

import type { ChatMessage } from "../../types/chat";

interface ChatWindowProps {

    messages: ChatMessage[];

}

export default function ChatWindow({

    messages

}: ChatWindowProps) {

    if (messages.length === 0) {

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
                    variant="h5"
                    color="text.secondary"
                >

                    Welcome to Astra AI 🚀

                </Typography>

            </Box>

        );

    }

    return (

        <Box
            sx={{
                flex: 1,
                overflowY: "auto",
                p: 3
            }}
        >

            {

                messages.map((message, index) => (

                    <Paper
                        key={`${message.role}-${index}`}
                        sx={{
                            p: 2,
                            mb: 2
                        }}
                    >

                        <Typography
                            variant="subtitle2"
                            color="primary"
                        >

                            {

                                message.role === "USER"

                                    ?

                                    "You"

                                    :

                                    "Astra AI"

                            }

                        </Typography>

                        <Typography>

                            {message.message}

                        </Typography>

                    </Paper>

                ))

            }

        </Box>

    );

}
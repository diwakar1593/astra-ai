import {
    Box,
    Paper,
    Typography
} from "@mui/material";

import type { ChatMessage } from "../../types/chat";

interface ChatWindowProps {

    messages: ChatMessage[];

    streamingResponse?: string;

}

export default function ChatWindow({

    messages,

    streamingResponse

}: ChatWindowProps) {

    return (

        <Box
            sx={{
                flex: 1,
                overflowY: "auto",
                p: 3
            }}
        >

            {

                messages.length === 0 &&
                !streamingResponse && (

                    <Box
                        sx={{
                            height: "100%",
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

                )

            }

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

                                    ? "You"

                                    : "Astra AI"

                            }

                        </Typography>

                        <Typography
                            sx={{
                                whiteSpace: "pre-wrap"
                            }}
                        >

                            {message.message}

                        </Typography>

                    </Paper>

                ))

            }

            {

                streamingResponse && (

                    <Paper
                        sx={{
                            p: 2,
                            mb: 2,
                            bgcolor: "#f5f5f5"
                        }}
                    >

                        <Typography
                            variant="subtitle2"
                            color="primary"
                        >

                            Astra AI

                        </Typography>

                        <Typography
                            sx={{
                                whiteSpace: "pre-wrap"
                            }}
                        >

                            {streamingResponse}

                        </Typography>

                    </Paper>

                )

            }

        </Box>

    );

}
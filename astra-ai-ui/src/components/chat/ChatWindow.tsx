import {
    Box,
    Paper,
    Typography
} from "@mui/material";

import type { ChatMessage } from "../../types/chat";
import { useEffect, useRef } from "react";

interface ChatWindowProps {

    messages: ChatMessage[];

    loading: boolean;

}



export default function ChatWindow({

    messages,

    loading

}: ChatWindowProps) {

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

    bottomRef.current?.scrollIntoView({

        behavior: "smooth"

    });

}, [messages, loading]);

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
                !loading && (

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

                loading && (

                    <Paper
                        sx={{
                            p: 2,
                            mb: 2
                        }}
                    >

                        <Typography
                            variant="subtitle2"
                            color="primary"
                        >

                            Astra AI

                        </Typography>

                        <Typography>

                            Thinking...

                        </Typography>

                    </Paper>

                )

            }

            {/* Auto Scroll Target */}

            <div ref={bottomRef}></div>

        </Box>

    );

}
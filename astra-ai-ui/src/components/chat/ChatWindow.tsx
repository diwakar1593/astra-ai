import {
    Box,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";

import { useEffect, useRef } from "react";

import type { ChatMessage } from "../../types/chat";

interface ChatWindowProps {

    messages: ChatMessage[];

    loading: boolean;

}

export default function ChatWindow({

    messages,

    loading

}: ChatWindowProps) {

    const theme = useTheme();

    const mobile = useMediaQuery(
        theme.breakpoints.down("sm")
    );

    const bottomRef =
        useRef<HTMLDivElement>(null);

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

                p: {

                    xs: 1,

                    sm: 2,

                    md: 3

                },

                bgcolor: "#fafafa"

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

                            alignItems: "center",

                            textAlign: "center",

                            px: 2

                        }}
                    >

                        <Typography

                            sx={{

                                fontSize: {

                                    xs: 24,

                                    sm: 28,

                                    md: 34

                                },

                                color: "text.secondary",

                                fontWeight: 500

                            }}

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

                        elevation={2}

                        sx={{

                            p: {

                                xs: 1.5,

                                sm: 2

                            },

                            mb: 2,

                            borderRadius: 3

                        }}

                    >

                        <Typography

                            variant="subtitle2"

                            color="primary"

                            sx={{

                                mb: 1,

                                fontWeight: 600

                            }}

                        >

                            {

                                message.role === "USER"

                                    ? "You"

                                    : "Astra AI"

                            }

                        </Typography>

                        <Typography

                            sx={{

                                whiteSpace: "pre-wrap",

                                wordBreak: "break-word",

                                fontSize: {

                                    xs: 14,

                                    sm: 15,

                                    md: 16

                                }

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

                        elevation={2}

                        sx={{

                            p: {

                                xs: 1.5,

                                sm: 2

                            },

                            borderRadius: 3

                        }}

                    >

                        <Typography

                            variant="subtitle2"

                            color="primary"

                            sx={{

                                mb: 1,

                                fontWeight: 600

                            }}

                        >

                            Astra AI

                        </Typography>

                        <Typography

                            sx={{

                                fontStyle: "italic",

                                color: "text.secondary"

                            }}

                        >

                            Thinking...

                        </Typography>

                    </Paper>

                )

            }

            <div ref={bottomRef} />

        </Box>

    );

}
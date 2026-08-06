import {
    Box,
    IconButton,
    TextField
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

import { useState } from "react";
import type { KeyboardEvent } from "react";

interface ChatInputProps {

    onSend: (message: string) => void;

    loading: boolean;

}

export default function ChatInput({

    onSend,

    loading

}: ChatInputProps) {

    const [

        message,

        setMessage

    ] = useState("");

    function send() {

        if (!message.trim()) {
            return;
        }

        onSend(message);

        setMessage("");

    }

    function handleKeyDown(

        event: KeyboardEvent<HTMLInputElement>

    ) {

        if (event.key === "Enter") {

            event.preventDefault();

            send();

        }

    }

    return (

        <Box
            sx={{
                p: 2,
                display: "flex",
                gap: 2
            }}
        >

            <TextField

                fullWidth

                disabled={loading}

                placeholder="Ask Astra AI..."

                value={message}

                onChange={(e) =>
                    setMessage(e.target.value)
                }

                onKeyDown={handleKeyDown}

            />

            <IconButton

                color="primary"

                disabled={loading}

                onClick={send}

            >

                <SendIcon />

            </IconButton>

        </Box>

    );

}
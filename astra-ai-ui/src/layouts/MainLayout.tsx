import { Box } from "@mui/material";

import { useState } from "react";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import ChatService from "../services/ChatService";

import type {
    ChatRequest,
    ChatMessage
} from "../types/chat";

export default function MainLayout() {

    const [

        selectedSession,

        setSelectedSession

    ] = useState<number | null>(null);

    const [

        messages,

        setMessages

    ] = useState<ChatMessage[]>([]);

    const [

        streamingResponse,

        setStreamingResponse

    ] = useState("");

    async function loadHistory(

        sessionId: number

    ) {

        console.log("Selected Session:", sessionId);
        try {

            const history =

                await ChatService.getHistory(
                    sessionId
                );

            setSelectedSession(
                sessionId
            );

            setMessages(
                history
            );

        } catch (error) {

            console.error(error);

        }

    }

    async function sendMessage(

        message: string

    ) {

        try {

            setStreamingResponse("");

            await ChatService.streamMessage(

                {

                    sessionId: selectedSession,

                    message

                },

                (chunk) => {

                    setStreamingResponse(

                        previous => previous + chunk

                    );

                }

            );

            if (selectedSession !== null) {

                await loadHistory(selectedSession);

            }

            setStreamingResponse("");

        } catch (error) {

            console.error(error);

        }

    }

    function handleNewChat() {

        setSelectedSession(null);

        setMessages([]);

    }

    return (

        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >

            <Header />

            <Box
                sx={{
                    flex: 1,
                    display: "flex"
                }}
            >

                <Sidebar

                    selectedSessionId={
                        selectedSession
                    }

                    onSessionSelect={
                        loadHistory
                    }

                    onNewChat={handleNewChat}

                />

                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column"
                    }}
                >

                    <ChatWindow
                        messages={messages}
                        streamingResponse={
                            streamingResponse
                        }
                    />

                    <ChatInput
                        onSend={sendMessage}
                    />

                </Box>

            </Box>

        </Box>

    );

}
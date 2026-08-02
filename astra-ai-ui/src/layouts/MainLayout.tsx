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

            const request: ChatRequest = {

                sessionId: selectedSession,

                message

            };

            const response =

                await ChatService.sendMessage(
                    request
                );

            setSelectedSession(response.sessionId);

            await loadHistory(response.sessionId);

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
                    />

                    <ChatInput
                        onSend={sendMessage}
                    />

                </Box>

            </Box>

        </Box>

    );

}
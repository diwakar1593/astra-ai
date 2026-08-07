import { 
    Box,
    Drawer,
    useMediaQuery,
    useTheme
} from "@mui/material";

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

    const [

        loading,

        setLoading

    ] = useState(false);

    const [

    drawerOpen,

    setDrawerOpen

] = useState(false);

const theme =

    useTheme();

const mobile =

    useMediaQuery(

        theme.breakpoints.down("md")

    );

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

            setLoading(true);

            const request: ChatRequest = {

                sessionId: selectedSession,

                message

            };

            const response =

                await ChatService.sendMessage(
                    request
                );

            await loadHistory(
                response.sessionId
            );

            setSelectedSession(
                response.sessionId
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    function handleNewChat() {

        setSelectedSession(null);

        setMessages([]);

    }

    function handleDeleteSession() {

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

            <Header

    onMenuClick={()=>

        setDrawerOpen(true)

    }

/>

            <Box
                sx={{
                    flex: 1,
                    display: "flex"
                }}
            >

                {
    mobile ? (

        <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
        >

            <Sidebar
                selectedSessionId={selectedSession}
                onSessionSelect={(id) => {

                    loadHistory(id);

                    setDrawerOpen(false);

                }}
                onNewChat={() => {

                    handleNewChat();

                    setDrawerOpen(false);

                }}
                onDeleteSession={handleDeleteSession}
            />

        </Drawer>

    ) : (

        <Sidebar
            selectedSessionId={selectedSession}
            onSessionSelect={loadHistory}
            onNewChat={handleNewChat}
            onDeleteSession={handleDeleteSession}
        />

    )
}

                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column"
                    }}
                >

                    <ChatWindow
                        messages={messages}
                        loading={loading}
                    />

                    <ChatInput
                        onSend={sendMessage}
                        loading={loading}
                    />

                </Box>

            </Box>

        </Box>

    );

}
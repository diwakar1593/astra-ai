import { Box } from "@mui/material";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

export default function MainLayout() {

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
                    display: "flex",
                    overflow: "hidden"
                }}
            >

                <Sidebar />

                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column"
                    }}
                >

                    <ChatWindow />

                    <ChatInput />

                </Box>

            </Box>

        </Box>

    );

}
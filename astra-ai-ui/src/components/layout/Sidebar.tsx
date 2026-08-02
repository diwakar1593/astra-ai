import {

    Box,

    Button,

    CircularProgress,

    Divider,

    List,

    ListItemButton,

    ListItemText,

    Typography

} from "@mui/material";

import { useEffect, useState } from "react";

import ChatService from "../../services/ChatService";

import type { ChatSession } from "../../types/chat";

export default function Sidebar() {

    const [sessions, setSessions] =
        useState<ChatSession[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadSessions();

    }, []);

    async function loadSessions() {

        try {

            const data =
                await ChatService.getSessions();

            setSessions(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    return (

        <Box
            sx={{
                width: 300,
                height: "100%",
                bgcolor: "background.paper",
                borderRight: 1,
                borderColor: "divider"
            }}
        >

            <Box
                sx={{ p: 2 }}
            >

                <Button

                    fullWidth

                    variant="contained"

                >

                    + New Chat

                </Button>

            </Box>

            <Divider />

            {

                loading ?

                (

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 3
                        }}
                    >

                        <CircularProgress />

                    </Box>

                )

                :

                (

                    <List>

                        {

                            sessions.map(session => (

                                <ListItemButton
                                    key={session.id}
                                >

                                    <ListItemText

                                        primary={session.title}

                                    />

                                </ListItemButton>

                            ))

                        }

                    </List>

                )

            }

        </Box>

    );

}
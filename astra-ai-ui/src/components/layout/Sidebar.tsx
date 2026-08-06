import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {

    Box,

    Button,

    CircularProgress,

    Divider,

    List,

    ListItemButton,

    ListItemText,

    TextField,

    Typography,

    IconButton

} from "@mui/material";

import { useEffect, useState } from "react";

import ChatService from "../../services/ChatService";

import type { ChatSession } from "../../types/chat";

interface SidebarProps {

    selectedSessionId: number | null;

    onSessionSelect: (sessionId: number) => void;

    onNewChat: () => void;

}

export default function Sidebar({

    selectedSessionId,

    onSessionSelect,

    onNewChat

}: SidebarProps) {

    const [sessions, setSessions] =
        useState<ChatSession[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [
        editingSession,
        setEditingSession
    ] = useState<number | null>(null);

    const [
        editedTitle,
        setEditedTitle
    ] = useState("");

    useEffect(() => {

        loadSessions();

    }, [selectedSessionId]);

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

    async function renameSession(sessionId: number) {

        try {

            await ChatService.renameSession(
                sessionId,
                editedTitle
            );

            await loadSessions();

            setEditingSession(null);

            setEditedTitle("");

        } catch (error) {

            console.error(error);

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
                    onClick={onNewChat}
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

                                        key={session.sessionId}
                                        selected={selectedSessionId === session.sessionId}
                                        onClick={() => {

                                            if (editingSession !== session.sessionId) {

                                                onSessionSelect(session.sessionId);

                                            }

                                        }}
                                    >

                                        {

                                            editingSession === session.sessionId

                                                ?

                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        width: "100%"
                                                    }}
                                                >

                                                    <TextField

                                                        size="small"

                                                        value={editedTitle}

                                                        onChange={(e) =>

                                                            setEditedTitle(

                                                                e.target.value

                                                            )

                                                        }

                                                        fullWidth

                                                    />

                                                    <IconButton

                                                        color="success"

                                                        onClick={() =>

                                                            renameSession(

                                                                session.sessionId

                                                            )

                                                        }

                                                    >

                                                        <CheckIcon />

                                                    </IconButton>

                                                    <IconButton

                                                        color="error"

                                                        onClick={() =>

                                                            setEditingSession(null)

                                                        }

                                                    >

                                                        <CloseIcon />

                                                    </IconButton>

                                                </Box>

                                                :

                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        width: "100%"
                                                    }}
                                                >

                                                    <ListItemText

                                                        primary={session.title}

                                                    />

                                                    <IconButton

                                                        size="small"

                                                        onClick={(event) => {

                                                            event.stopPropagation();

                                                            setEditingSession(

                                                                session.sessionId

                                                            );

                                                            setEditedTitle(

                                                                session.title

                                                            );

                                                        }}

                                                    >

                                                        <EditIcon
                                                            fontSize="small"
                                                        />

                                                    </IconButton>

                                                </Box>

                                        }

                                    </ListItemButton>

                                ))

                            }

                        </List>

                    )

            }

        </Box>

    );

}
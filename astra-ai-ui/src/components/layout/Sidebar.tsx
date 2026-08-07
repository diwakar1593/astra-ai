import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
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
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";

import { useEffect, useState } from "react";

import ChatService from "../../services/ChatService";

import type { ChatSession } from "../../types/chat";

interface SidebarProps {

    selectedSessionId: number | null;

    onSessionSelect: (sessionId: number) => void;

    onNewChat: () => void;

    onDeleteSession: () => void;

}

export default function Sidebar({

    selectedSessionId,

    onSessionSelect,

    onNewChat,

    onDeleteSession

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

    const [
        deleteSessionId,
        setDeleteSessionId
    ] = useState<number | null>(null);

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

    async function deleteSession() {

        if (

            deleteSessionId === null

        ) {

            return;

        }

        try {

            await ChatService.deleteSession(

                deleteSessionId

            );

            await loadSessions();

            if (

                selectedSessionId === deleteSessionId

            ) {

                onDeleteSession();

            }

            setDeleteSessionId(null);

        }

        catch (error) {

            console.error(error);

        }

    }

    return (

        <>
            <Box
                sx={{
                width:{

    xs:260,

    sm:280,

    md:320

},
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

                                                        <IconButton

                                                            size="small"

                                                            color="error"

                                                            onClick={(event) => {

                                                                event.stopPropagation();

                                                                setDeleteSessionId(

                                                                    session.sessionId

                                                                );

                                                            }}

                                                        >

                                                            <DeleteIcon
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

            <Dialog

                open={deleteSessionId !== null}

                onClose={() =>

                    setDeleteSessionId(null)

                }

            >

                <DialogTitle>

                    Delete Chat

                </DialogTitle>

                <DialogContent>

                    <DialogContentText>

                        Are you sure you want to delete this conversation?

                    </DialogContentText>

                </DialogContent>

                <DialogActions>

                    <Button

                        onClick={() =>

                            setDeleteSessionId(null)

                        }

                    >

                        Cancel

                    </Button>

                    <Button

                        color="error"

                        onClick={deleteSession}

                    >

                        Delete

                    </Button>

                </DialogActions>

            </Dialog>
        </>



    );



}
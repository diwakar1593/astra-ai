import {
    Box,
    Button,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";

export default function Sidebar() {

    const chats = [

        "Spring Boot",

        "React",

        "SQL",

        "Docker"

    ];

    return (

        <Box
            sx={{
                width: 280,
                height: "100%",
                bgcolor: "background.paper",
                borderRight: 1,
                borderColor: "divider"
            }}
        >

            <Box
                sx={{
                    p: 2
                }}
            >

                <Button
                    fullWidth
                    variant="contained"
                >

                    + New Chat

                </Button>

            </Box>

            <Divider />

            <List>

                {

                    chats.map(chat => (

                        <ListItemButton
                            key={chat}
                        >

                            <ListItemText
                                primary={chat}
                            />

                        </ListItemButton>

                    ))

                }

            </List>

        </Box>

    );

}
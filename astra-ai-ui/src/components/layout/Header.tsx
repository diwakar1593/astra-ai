import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {

    return (

        <AppBar
            position="static"
            elevation={0}
        >

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                >

                    Astra AI

                </Typography>

                <Box>

                    <IconButton color="inherit">

                        <Avatar>

                            <AccountCircleIcon />

                        </Avatar>

                    </IconButton>

                </Box>

            </Toolbar>

        </AppBar>

    );

}
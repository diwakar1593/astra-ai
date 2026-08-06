import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    Divider
} from "@mui/material";

import { useState } from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

import { useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getEmail, getDisplayName } from "../../utils/auth";

export default function Header() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    function handleMenuOpen(
        event: React.MouseEvent<HTMLElement>
    ) {

        setAnchorEl(event.currentTarget);

    }

    function handleMenuClose() {

        setAnchorEl(null);

    }

    function logout() {

        localStorage.removeItem("token");

        navigate("/login");

    }



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

                    <IconButton
                        onClick={handleMenuOpen}
                    >

                        <Avatar>

                            D

                        </Avatar>

                    </IconButton>

                </Box>

            </Toolbar>

            <Menu

                anchorEl={anchorEl}

                open={open}

                onClose={handleMenuClose}

            >

                <Box
                    sx={{
                        px: 2,
                        py: 1
                    }}
                >

                    <Typography
                        fontWeight="bold"
                    >
                        {getDisplayName()}
                    </Typography>


                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        {getEmail()}

                    </Typography>

                </Box>

                <Divider />

                <MenuItem
                    onClick={handleMenuClose}
                >

                    <PersonIcon
                        sx={{ mr: 1 }}
                    />

                    Profile

                </MenuItem>

                <MenuItem
                    onClick={handleMenuClose}
                >

                    <SettingsIcon
                        sx={{ mr: 1 }}
                    />

                    Settings

                </MenuItem>

                <Divider />

                <MenuItem
                    onClick={logout}
                >

                    <LogoutIcon
                        sx={{ mr: 1 }}
                    />

                    Logout

                </MenuItem>

            </Menu>

        </AppBar>

    );

}
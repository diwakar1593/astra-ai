import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    Divider,
    useMediaQuery,
    useTheme
} from "@mui/material";

import { useState } from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { getEmail, getDisplayName } from "../../utils/auth";

interface HeaderProps {

    onMenuClick: () => void;

}

export default function Header({
    onMenuClick
}: HeaderProps) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const {

        logout

    } = useAuth();

    const theme = useTheme();

    const mobile =

        useMediaQuery(

            theme.breakpoints.down("md")

        );

    function handleMenuOpen(
        event: React.MouseEvent<HTMLElement>
    ) {

        setAnchorEl(event.currentTarget);

    }

    function handleMenuClose() {

        setAnchorEl(null);

    }

    function handleLogout() {

        handleMenuClose();

        logout();

        navigate(

            "/login",

            {

                replace: true

            }

        );

    }


    return (

        <AppBar
            position="static"
            elevation={0}
        >

            <Toolbar>

                {

                    mobile && (

                        <IconButton
                            color="inherit"
                            onClick={onMenuClick}
                            edge="start"
                            sx={{ mr: 2 }}
                        >

                            <MenuIcon />

                        </IconButton>

                    )

                }

                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                >

                    Astra AI

                </Typography>

                <IconButton
                    onClick={handleMenuOpen}
                    color="inherit"
                >

                    <Avatar>

                        D

                    </Avatar>

                </IconButton>

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
                        sx={{ fontWeight: "bold" }}
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
                    onClick={handleLogout}
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
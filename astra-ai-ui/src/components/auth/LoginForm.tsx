import {
    Alert,
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import AuthService from "../../services/AuthService";

import { useAuth } from "../../hooks/useAuth";



export default function LoginForm() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    async function handleLogin() {

        try {

            setLoading(true);

            setError("");

            const response =
                await AuthService.login({
                    email,
                    password
                });

            login(response.token);

            navigate("/");

        } catch (err: any) {

            setError(

                err.response?.data?.message ??

                "Login failed."

            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <Paper
            elevation={6}
            sx={{
                p: 5,
                width: 420,
                borderRadius: 4
            }}
        >

            <Stack spacing={3}>

                <Typography
                    variant="h4"
                    sx={{ textAlign: "center" }}
                >
                    Astra AI
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                >
                    Sign in to continue
                </Typography>

                {

                    error &&

                    <Alert severity="error">

                        {error}

                    </Alert>

                }

                <TextField

                    label="Email"

                    value={email}

                    onChange={(e) =>
                        setEmail(e.target.value)
                    }

                    fullWidth

                />

                <TextField

                    label="Password"

                    type="password"

                    value={password}

                    onChange={(e) =>
                        setPassword(e.target.value)
                    }

                    fullWidth

                />

                <Button

                    variant="contained"

                    size="large"

                    onClick={handleLogin}

                    disabled={loading}

                >

                    {

                        loading ?

                            "Signing In..."

                            :

                            "Login"

                    }

                </Button>

            </Stack>

        </Paper>

    );

}
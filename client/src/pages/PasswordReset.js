import * as React from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { Container, Typography, Box, TextField, CssBaseline, Button, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { Component } from "react";
import validator from 'validator';
import Axios from "axios";
import { useSearchParams } from "react-router-dom";

function PasswordReset() {

    const [msg, setMsg] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const handleClick = () => {
        //Validating the password
        if (validator.isStrongPassword(password) && password === confirmPassword) {
            setMsg('Your Password has been reset.');
            Axios.put("http://localhost:8080/ResettingPassword", {
                password: password,
                id : searchParams.get("id"),
                ResetToken: searchParams.get("token")
            }).catch((err) => {
                if (err.response.status === 405) {
                    setMsg("The link has expired!");
                }
            })

        } else {
            setMsg('Enter valid password or passwords do not match.');
        }

    };
    useEffect(() => {
        checkValidLink();
    }, [])

    const checkValidLink = () => {
        if (!searchParams.get("id") || !searchParams.get("token")) {
            window.location.href = "/";
        } else {
            Axios.get("http://localhost:8080/checkPasswordLink", { withCredentials: true, params: { id: searchParams.get("id"), utoken: searchParams.get("token") } }).then((response) => {

            }).catch((err => {
                //Checks if the credentials are valid but the doctor has not yet been validated
                if (err.response.status === 405) {
                    window.location.href = "/";
                } else {
                    console.log(err);
                }
            }));
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOpenTwoToneIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <Box sx={{ mt: 1 }}>
                    {/* User providing the password*/}
                    <TextField margin="normal" required fullWidth id="password" label="New Password" name="password" type="password" value={password} onChange={(ev) => setPassword(ev.target.value)}
                    />

                    <TextField margin="normal" required fullWidth id="confirmPassword" label="Confirm New Password" name="confirmPassword" type="password" value={confirmPassword} onChange={(ev) => setConfirmPassword(ev.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" onClick={handleClick} sx={{ mt: 3, mb: 2 }}>
                        Reset Password
                    </Button>
                    {/* Displays confirmation message based status send from server */}
                    {msg && msg}
                </Box>
            </Box>
        </Container>
    );
}

export default PasswordReset;

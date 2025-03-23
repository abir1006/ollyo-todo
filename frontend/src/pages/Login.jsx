import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Box,
    Typography,
    Paper,
} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import {useLoginMutation} from "../redux/apis/Auth/index.js";
import {useDispatch} from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials).unwrap();
            const { data } = await refetch();
            console.log(data);
            alert('Login successful!');
        } catch (error) {
            alert(error?.data?.message || 'Login failed');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100vw"
            height="100vh"
            bgcolor="#f5f5f5"
        >
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{padding: 4, marginTop: 8, textAlign: "center"}}>
                    <Box display="flex" justifyContent="center" mb={2}>
                        <LockOutlined color="primary" fontSize="large"/>
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            autoComplete="off"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="email"
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Password"
                            autoComplete="off"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginTop: 2}}>
                            Login
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;

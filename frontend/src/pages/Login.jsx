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
import {setAuth} from "../redux/slices/authSlice.jsx";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(credentials).unwrap();
            // Extract user and token from response
            const { token, user } = response;

            // Dispatch to Redux and store token
            dispatch(setAuth({ user, token }));

            // Redirect to tasks page
            navigate('/tasks');
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
                    <Typography variant="h6" gutterBottom>
                        Welcome to Task Manager App <br/> Login with default user & password
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            autoComplete="off"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="email"
                            name="email"
                            defaultValue="test@example.com"
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
                            name="password"
                            defaultValue="123"
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

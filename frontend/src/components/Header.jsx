import { Box, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../redux/slices/authSlice.jsx";
import { useLogoutApiMutation } from "../redux/apis/Auth/index.js";

const Header = ({ title }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector(state => state?.auth?.user?.name || '');

    const [logoutApi] = useLogoutApiMutation(); // Use the mutation hook

    const handleLogout = async () => {
        try {
            await logoutApi().unwrap(); // Call the logout API

            // Clear Redux state
            dispatch(logout());

            // Redirect to login page
            navigate("/login");
        } catch (error) {
            console.log("Logout failed!");
        }
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">{title}</Typography>
            <Box display="flex" alignItems="center">
                <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
                    Welcome, {userName}!
                </Typography>
                <IconButton onClick={handleLogout} color="error">
                    <LogoutIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Header;

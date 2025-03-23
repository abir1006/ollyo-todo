import { Box, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({ title, userName, handleLogout }) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">{title}</Typography>
            <Box display="flex" alignItems="center">
                <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
                    Welcome, Abdoon!
                </Typography>
                <IconButton onClick={handleLogout} color="error">
                    <LogoutIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Header;

import { Box, Container, Paper } from "@mui/material";

const PageLayout = ({ children }) => {
    return (
        <Box
            width="99vw"
            minHeight="100vh"
            bgcolor="#f5f5f5"
            display="flex"
            justifyContent="center"
            alignItems="top"
        >
            <Container maxWidth="xl">
                <Paper elevation={3} sx={{ padding: 4, marginTop: "15px", marginBottom: "15px"}}>
                    {children}
                </Paper>
            </Container>
        </Box>
    );
};

export default PageLayout;

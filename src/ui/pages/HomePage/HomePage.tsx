import { Box, Container, Typography } from '@mui/material';

const HomePage = () => {
    return (
        <Box sx={{ m: 0, p: 0 }}>
            <Container maxWidth='xl' sx={{ mt: 1, py: 1, textAlign: 'start' }}>
                <Typography color="error" variant='h4'>
                    E-Library
                </Typography>
            </Container>
        </Box>

    );
};

export default HomePage;
import { AppBar, Box, Toolbar} from '@mui/material';

const Footer = () => {
    return (
        //box == div
        <Box component='footer' sx={{ mt: 'auto' }}>
            <AppBar position='static' component='div' sx={{ backgroundColor: '#ff7930' }}>
                <Toolbar sx={{ justifyContent: 'center' }}>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default Footer;
import './Header.css';
import {
    AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext.tsx';

const pages = [
    { path: '/', name: 'home' },
    { path: '/books', name: 'books' },
    { path: '/authors', name: 'authors' },
    { path: '/countries', name: 'countries' }
];

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box>
            <AppBar position='static' sx={{ backgroundColor: '#ff7961' }}>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{ mr: 2, display: { md: 'none' } }}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant='h6' component='div' sx={{ mr: 3 }}>
                        E-Library
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link key={page.name} to={page.path}>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    {isAuthenticated ? (
                        <Button color='inherit' sx={{ ml: 'auto' }} onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button color='inherit' sx={{ ml: 'auto' }} onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 240 }} role='presentation' onClick={() => setDrawerOpen(false)}>
                    <List>
                        {pages.map((page) => (
                            <ListItem key={page.name} disablePadding>
                                <ListItemButton component={Link} to={page.path}>
                                    <ListItemText primary={page.name} sx={{ textTransform: 'capitalize' }}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};

export default Header;
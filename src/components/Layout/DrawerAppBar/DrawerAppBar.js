import * as React from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {clearError, logout} from "store/auth/authActions";
import {ADMIN, GUEST, USER} from "roles/Roles";
import SearchField from "components/SearchBar/SearchField";
import logo from 'assets/logo.png';
import classes from './DrawerAppBar.module.scss';

const drawerWidth = 240;

const navigationItems = [
    {
        label: 'Login',
        path: '/login',
        role: [GUEST]
    },
    {
        label: 'Register',
        path: '/register',
        role: [GUEST]
    },
    {
        label: 'Books',
        path: '/books',
        role: [GUEST, USER, ADMIN]
    },
    {
        label: 'Authors',
        path: '/authors',
        role: [GUEST, USER, ADMIN]
    },
    {
        label: 'Bestsellers',
        path: '/bestsellers',
        role: [GUEST, USER, ADMIN]
    },
    {
        label: 'Profile',
        path: '/users',
        role: [USER]
    },
    {
        label: 'My books',
        path: '/collections',
        role: [USER]
    },
    {
        label: 'New Book',
        path: '/newBook',
        role: [ADMIN]
    },
    {
        label: 'New Author',
        path: '/newAuthor',
        role: [ADMIN]
    },
    {
        label: 'Logout',
        path: '/',
        role: [USER, ADMIN]
    },
];

function DrawerAppBar(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {user} = useSelector(state => state.authReducer);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = user ? navigationItems.filter(item => item.role.includes(user.type)) : navigationItems.filter(item => item.role.includes(GUEST));

    const handleRoutePress = item => {
        if (item.label === 'Logout') {
            dispatch(logout());
        }
        dispatch(clearError());
        if (item.label === 'Profile' || item.label === 'My books'){
            navigate(`${item.path}/${user.username}`)
        }
        else {
            navigate(item.path);
        }
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6">
                <Button onClick={() => {navigate('/')}} sx={{color:'#000', width: '250px', height: '70px'}}>
                    <img src={logo} className={classes.logoIMG} width="40%" height="auto"/>
                </Button>
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton onClick={() => {
                            handleRoutePress(item);
                        }} sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { xs: 'block', sm: 'block', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}
                    >
                        <Button sx={{ color: '#fff', height: '40px', borderRadius: '15px', padding: '2px'}}   onClick={() => {navigate('/')}}>
                            <img src={logo} height="100%" className={classes.logoIMG} width="auto"/>
                        </Button>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block'} }}>
                        {navItems.map((item) => (
                            <Button onClick={() => {
                                handleRoutePress(item);
                            }} key={item.label} sx={{ color: '#fff' }}>
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                    <SearchField/>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar />
                <Box className={classes.outletBox}>
                    <Outlet/>
                </Box>
            </Box>
        </Box>
    );
}

export default DrawerAppBar;

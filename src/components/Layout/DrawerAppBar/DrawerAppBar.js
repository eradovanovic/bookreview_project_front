import * as React from 'react';
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
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import {InputBase} from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "store/auth/authActions";
import {ADMIN, GUEST, USER} from "roles/Roles";
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
        label: 'Profile',
        path: '/users/id',
        role: [USER]
    },
    {
        label: 'My books',
        path: '/collections/id',
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
        label: 'Change Password',
        path: '/changePassword',
        role: [ADMIN]
    },
    {
        label: 'Logout',
        path: '/',
        role: [USER, ADMIN]
    },
];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function DrawerAppBar(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {loggedUser} = useSelector(state => state.authReducer);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = navigationItems.filter(item => item.role.includes(loggedUser?loggedUser.type:GUEST));

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }} onClick={ () => {navigate('/');}}>
                <Button onClick={() => {navigate('/')}} sx={{color:'#000'}}>Book App</Button>
            </Typography>
            <Divider />

            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton onClick={() => {
                            if (item.label === 'Logout'){
                                dispatch(logout());
                            }
                            navigate(item.path);
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
                        <Button sx={{ color: '#fff' }} onClick={() => {navigate('/')}}>Book App</Button>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block'} }}>
                        {navItems.map((item) => (
                            <Button onClick={() => {
                                if (item.label === 'Logout'){
                                    dispatch(logout());
                                }
                                navigate(item.path);
                            }} key={item.label} sx={{ color: '#fff' }}>
                                {item.label}
                            </Button>
                        ))}

                    </Box>
                    <Search sx={{ display: { xs: 'block', sm: 'block', md: 'block'} }}>
                        <SearchIconWrapper>
                            <ButtonBase>
                                <SearchIcon/>
                            </ButtonBase>
                        </SearchIconWrapper>

                        <StyledInputBase
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
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

import React, {useState} from 'react';
import DrawerList from './DrawerList';
import {
    AppBar, 
    Toolbar, 
    Button, 
    Typography, 
    Badge, 
    IconButton, 
    Drawer, 
    useMediaQuery
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import Cookie from 'js-cookie';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: '#171717'
    },
    title: {
      flexGrow: 1,
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        marginRight: 30,
        outline: 'none',
        '&:hover': {
            borderBottom: '2px solid #19CE96'
        }
    },
    btn: {
        backgroundColor: '#19CE96',
        color: '#000',
        fontWeight: 'bold',
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        borderRadius: 30,
        transition: 'all 0.5s ease',
        '&:hover': {
            backgroundColor: 'rgba(25, 206, 150, 0.5)',
            color: '#000',
        }
    },
    logoutBtn: {

    },
    span: {
        color: '#19CE96'
    }
  }));

  const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#19CE96',
        color: '#000',
        fontWeight: '700'
    }
  }))(Badge);

const Header = () => {

    const classes = useStyles();

    // Declare a variable for mobile version
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // Store menus attributes
    const menuItems = [
        {
            title: "Home",
            url: "/",
            icon: <HomeIcon />
        },
        {
            title: "Products",
            url: "/products",
            icon: <StoreIcon />
        },
        {
            title: "About",
            url: "/about",
            icon: <InfoIcon />
        },
        {
            title: "Contact",
            url: "/contact",
            icon: <ContactSupportIcon />
        }
    ]

    // state for declare drawer is open or not
    const [state, setState] = useState(false);

    const {cartItems} = useSelector(state => state.cart);
    const {userData} = useSelector(state => state.signInUser);
    
    // compute sum of items in cart
    const countCartItem = () => {
        return cartItems.map(cartItem => Number(cartItem.qty)).reduce((total, num) => total + num, 0);
    }
    
    return (
        <AppBar position="static" elevation={0} className={classes.appBar}>
            <Toolbar>
                {isMobile ? 
                    <>
                    <IconButton edge="start" color="inherit" onClick={() => setState(true)} >
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="left" open={state} onClose={() => setState(false)}>
                        <DrawerList menuItems={menuItems} />
                    </Drawer>
                    </> : null
                }
                <Typography variant={isMobile ? "body2" : "h6"} className={classes.title}>
                   <span className={classes.span}>M.Y</span> Online Store
                </Typography>
                {!isMobile ? 
                    menuItems.map(item => (
                        <Link className={classes.link} to={item.url} key={item.title}>{item.title}</Link>
                    )) : null}
                <Button 
                className={classes.btn} 
                href={(userData && !userData.isAdmin) ? '/' : (userData && userData.isAdmin) ? '/admindashboard' : '/signin'}
                endIcon={<SupervisorAccountIcon />}>
                    {userData ? userData.name : 'Sign In'}
                </Button>
                {userData && 
                    <Button 
                    variant="text"
                    color="inherit"
                    className={classes.logoutBtn}
                    href="/" 
                    onClick={() => {
                        userData && Cookie.remove('userData'); 
                    }}>
                        Logout
                    </Button>
                }
                <IconButton color="inherit" href="/cart">
                    <StyledBadge 
                    badgeContent={cartItems.length > 0 ? countCartItem() : '0'} 
                    color="secondary"
                    >
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header;

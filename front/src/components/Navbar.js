import React, {useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShopIcon from '@material-ui/icons/Shop';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        textDecoration: 'none',
        color: 'inherit',
        overflow: 'visible',
        marginRight: '16px',
        fontSize: 42,
        [theme.breakpoints.down('sm')]: {
            fontSize: 24,
        },
    },
    menuTitle: {
        textDecoration: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 10px',
            fontSize: 16,
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));


export default function PrimarySearchAppBar({search, setSearch}) {
    const classes = useStyles();
    const cartItems = useSelector(state => state.cartItems)

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };


    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem component={Link} to={'/products'} onClick={handleMobileMenuClose}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                        <ShopIcon />
                </IconButton>
                <p>Каталог</p>
            </MenuItem>
            <MenuItem component={Link} to={'/about'} onClick={handleMobileMenuClose}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                        <InfoIcon />
                </IconButton>
                <p>Про нас</p>
            </MenuItem>
            <MenuItem component={Link} to={'/cart'} onClick={handleMobileMenuClose}>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={cartItems.length > 0 ? cartItems.length : null} color="secondary">
                        <ShoppingCartIcon/>
                    </Badge>
                </IconButton>
                <p>Корзина</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap component={Link} to={'/'}>
                            Водяной
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Пошук…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Button color="inherit" className={classes.menuTitle}  component={Link} to={'/products'}>
                                Каталог
                        </Button>
                        <Button color="inherit" className={classes.menuTitle} component={Link} to={'/about'}>
                            Про нас
                        </Button>

                        <IconButton aria-label="show 17 new notifications" color="inherit" component={Link} to={'/cart'}>
                            <Badge badgeContent={cartItems.length > 0 ? cartItems.length : null} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </div>
    );
}

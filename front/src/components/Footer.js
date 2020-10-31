import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        marginTop: 40,
    },
    text: {
        margin: '30px 0'
    },
    maxwidth: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '50vw',
        margin: '0 auto',

        [theme.breakpoints.down('xs')]: {
            display: 'block',
            textAlign: 'center'
        },
    },
    bg: {
        background: '#e0e0e0',
        color: '#000000'
    },
    mt20: {
      marginTop: 20
    },
    title: {
        textDecoration: 'none',
        color: 'inherit',
        fontSize: 38,
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: 24,
        },
    },
    menuTitleBtn: {
        fontSize: 20,
        display: 'block',
        textAlign: 'center'
    },
    menuTitle: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        fontSize: 20,
        padding: '7px 0',
        textAlign: 'center'
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.bg}>
                <Toolbar className={classes.maxwidth}>
                    <div className={classes.text}>
                        <Typography className={classes.title} variant="h6" noWrap component={Link} to={'/'}>
                            Водяной
                        </Typography>
                        <Divider/>
                        <div className={classes.mt20}>
                            <Button className={classes.menuTitleBtn}  component={Link} to={'/products'}>
                                Каталог
                            </Button>
                            <Button className={classes.menuTitleBtn} component={Link} to={'/about'}>
                                Про нас
                            </Button>
                        </div>

                    </div>

                    <div className={classes.text}>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Контакти
                        </Typography>
                        <Divider/>
                        <div className={classes.mt20}>
                            <Typography className={classes.menuTitle}>
                                +380 98 765 43 21
                            </Typography>
                            <Typography className={classes.menuTitle}>
                                test@gmail.com
                            </Typography>
                        </div>

                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

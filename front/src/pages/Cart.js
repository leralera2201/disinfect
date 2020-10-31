import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import CartItem from "../components/CartItem";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {removeAllItems} from "../store/actions/cartActions";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from "react-router-dom";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import FormDialog from "../components/OrderForm";

const useStyles = makeStyles(theme => ({
    root: {
        padding: '50px 20px',
        minHeight: '70vh',
        maxWidth: 1200,
        margin: '0 auto'
    },
    flex: {
        marginTop: 150,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    icon: {
      width: 70,
      height: 70
    },
    text: {
        [theme.breakpoints.only('xs')]: {
            fontSize: 30
        },
    },
    gridCenter: {
        [theme.breakpoints.only('xs')]: {
            justifyContent: 'center',
            flexDirection: "column-reverse"
        },
    },
    alignEnd: {
        textAlign: 'end',
    },
    mt20: {
        [theme.breakpoints.only('xs')]: {
            marginTop: 20
        },
    },
    center: {
        [theme.breakpoints.only('xs')]: {
            textAlign: 'center',
        },
    },
    emptyTitle: {
        marginTop: 20,
        textAlign: 'center',
        [theme.breakpoints.only('xs')]: {
            fontSize: 28
        },
    },
    emptyText: {
        marginTop: 20,
        textAlign: 'center',
        [theme.breakpoints.only('xs')]: {
            fontSize: 20
        },
    }
}))


const Cart = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cartItems)
    const removeAll = (e) => {
        e.preventDefault()
        dispatch(removeAllItems())
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return <div className={classes.root}>
        {cartItems.length > 0 ? <>
                <Grid container justify={'space-between'} alignItems={'center'} style={{marginBottom: 20}}>
                    <Grid item><Typography variant="h3" className={classes.text}>Корзина</Typography></Grid>
                    <Grid item><Button variant="contained" color="default" onClick={removeAll}>Очистити</Button></Grid>
                </Grid>
                {cartItems.length > 0 && cartItems.map(el => <CartItem item={el} key={el.product._id}/>)}
                <Grid container justify={'space-between'} alignItems={'center'} style={{marginTop: 20}}
                      className={classes.gridCenter}>
                    <Grid item sm={6} xs={12} className={classes.center + " " + classes.mt20}>
                        <Button
                            variant="contained"
                            color="default"
                            startIcon={<ArrowBackIcon/>}
                            component={Link}
                            to={'/products'}
                        >
                            Повернутися в каталог
                        </Button>
                    </Grid>
                    <Grid sm={6} xs={12} item className={classes.alignEnd + " " + classes.center}><Button
                        variant="contained" color="primary" onClick={handleClickOpen}>Замовити</Button></Grid>
                    </Grid>
                    <FormDialog open={open} handleClose={handleClose} cartItems={cartItems}/>
            </>
            :
            <div className={classes.flex}>
                <RemoveShoppingCartIcon className={classes.icon}/>
                <Typography variant={'h3'} className={classes.emptyTitle}>Ваша корзина пуста.</Typography>
                <Typography variant={'h5'} className={classes.emptyText}>Наповніть її і поверніться знову</Typography>
                <Button
                    variant="contained"
                    style={{marginTop:20}}
                    color="default"
                    startIcon={<ArrowBackIcon/>}
                    component={Link}
                    to={'/products'}
                >
                    Повернутися в каталог
                </Button>
            </div>
        }
    </div>
}

export default Cart

import React from 'react'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {useDispatch} from "react-redux";
import {addToCart, removeFromCart} from "../store/actions/cartActions";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
    root: {
        margin: '30px 0',
        [theme.breakpoints.down('md')]: {
            padding: '0 20px'
        },
        [theme.breakpoints.only('xs')]: {
            position: 'relative',

        },
        // '@media (max-width: 420px)' : {
        //     width: 300
        // }
    },
    closeButton: {
        textAlign: 'center',
        [theme.breakpoints.only('xs')]: {
            position: 'absolute',
            top: -20,
            right: -15
        },
    },
    img: {
        maxWidth: 200,
        [theme.breakpoints.down('sm')]: {
            maxWidth: 160,
        },
        [theme.breakpoints.only('xs')]: {
            maxWidth: 230,
        },
    },
    textcenter: {
        textAlign: 'center',
        [theme.breakpoints.only('xs')]: {
            width: '100%'
        },
    },
    pd: {
        [theme.breakpoints.down('sm')]: {
            paddingTop: 20
        },
    },
    count: {
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.only('xs')]: {
            justifyContent: 'center'
        },
    },
    xsAlign: {
        [theme.breakpoints.only('xs')]: {
            textAlign: 'center',
            marginTop: 20
        },

    }
}))

const CartItem = ({item}) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const removeItem = () => {
        dispatch(removeFromCart(item.product._id))
    }

    const addQty = () => {
        if(item.qty < item.product.countOfAvailability){
            dispatch(addToCart(item.product, item.qty+1))
        }
    }

    const removeQty = () => {
        if(item.qty > 1){
            dispatch(addToCart(item.product, item.qty-1))
        }
    }

    return <div><Grid container className={classes.root} justify={'space-between'} alignItems={'center'}>
            <Grid item sm={3} className={classes.textcenter}>
                <Paper elevation={0}>
                    <img src={item.product.imageUrl} alt="img" className={classes.img}/>
                </Paper>
            </Grid>
        <Grid container item sm={6} justify={'space-between'} alignItems={'center'}>
            <Grid item md={9} className={classes.xsAlign}>
                <Typography variant={'h4'} gutterBottom>{item.product.title}</Typography>
                <Typography gutterBottom>{item.product.description}</Typography>
                <Typography variant={'h6'}>{item.product.size/1000}л.</Typography>
                <div className={classes.count}>
                    <IconButton style={{backgroundColor: '#eeeeee'}} aria-label="Видалити" color="default"  variant="contained" onClick={removeQty} disabled={item.qty === 1}>
                        <RemoveIcon/>
                    </IconButton>
                    <Typography style={{padding: '0 10px', fontSize: 24}}>{item.qty}</Typography>
                    <IconButton style={{backgroundColor: '#eeeeee'}} aria-label="Додати" color="default" variant="contained" onClick={addQty} disabled={item.product.countOfAvailability === item.qty}>
                        <AddIcon/>
                    </IconButton>
                </div>
            </Grid>
            <Grid item md={2} className={classes.textcenter + " " + classes.pd}>
                <Typography variant={'h5'}>{item.qty * item.product.newPrice} грн </Typography>
            </Grid>
        </Grid>
        <Grid item sm={1} className={classes.closeButton}>
            <IconButton aria-label="Видалити" color="inherit"  onClick={removeItem}>
                <CloseIcon/>
            </IconButton>
        </Grid>
        </Grid>
        <Divider/>
    </div>
  }



export default CartItem

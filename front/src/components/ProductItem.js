import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link, useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {setAlert} from "../store/actions/alertActions";
import {useDispatch} from "react-redux";
import {addToCart} from "../store/actions/cartActions";

const useStyles = makeStyles({
    card: {
        width: 345,
        height: '100%',
        position: 'relative',
        textDecoration: 'none',
        color: 'inherit'
    },
    media: {
        margin: '0 20px',
        height: 200,
    },
    mb50: {
        marginBottom: 90,
    },
    btn: {
        marginLeft: 10
    },
    buttons: {
        display: 'block',
        position: 'absolute',
        bottom: 10
    },
    prices: {
        margin: '0 0 10px 10px',
        display: 'flex',
    },
    price: {
        fontSize: 24
    },
    newprice: {
        color: '#575757',
        fontSize: 20,
        marginLeft: 10,
        textDecoration: 'line-through'
    },
});

export default function ProductItem({product}) {
    const history = useHistory()
    const classes = useStyles();
    const dispatch = useDispatch()
    const addToCartProduct = () => {
        dispatch(addToCart(product, 1))
        dispatch(setAlert('Товар доданий в корзину.', 'success'))
    }
    return (
        <Grid item xl={2} lg={3} md={4} sm={6} xs={12}  container direction="row"
              justify="center"
              alignItems="center"
        >
            <Card className={classes.card}>
                <CardActionArea onClick={()=> history.push('/products/' + product._id)}>
                    <CardMedia
                        className={classes.media}
                        image={product.imageUrl}
                        title="Contemplative Reptile"
                    />
                    <CardContent className={classes.mb50}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {product.title}
                            {/*Засіб концентрований для замочування інструменту GGA Professional*/}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {product.description}
                        </Typography>

                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.buttons}>
                    <span className={classes.prices}>
                        <Typography variant={'h5'} component="h2" style={{display: 'block'}} className={classes.price}>{product.newPrice} грн</Typography>
                        {(product.newPrice !== product.price) && <sup className={classes.newprice}>{product.price}</sup>}
                    </span>
                    <div>
                        <Button variant="contained" component={Link} to={'/products/' + product._id}>Детальніше</Button>
                        <Button variant="contained" color="primary" className={classes.btn} disabled={!product.isAvailable} onClick={addToCartProduct}>
                            Замовити
                        </Button>
                    </div>

                </CardActions>
            </Card>
        </Grid>
    );
}

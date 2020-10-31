import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getProductById} from "../store/actions/productActions";
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FullWidthTabs from "../components/TabPanel";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        minHeight: 500,
        paddingTop: 40
    },
    flex: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    img: {
        width: 500,
        [theme.breakpoints.down('xs')]: {
            width: 400
        },
        '@media (max-width: 420px)' : {
            width: 300
        }
    },
    mg: {
        [theme.breakpoints.up('md')]: {
            margin: '0 20px'
        },
    },
    arrow: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: 40
        },
    },
    mt50: {
        [theme.breakpoints.up('md')]: {
            marginTop: 60
        },
    }
}))

const ProductDetail = ({match, history}) => {
    const id = match.params.id
    const dispatch = useDispatch()
    const {product, error, loading} = useSelector(state => state.productDetail)
    const classes = useStyles()

    useEffect(() => {
        dispatch(getProductById(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return <div className={classes.root}>
        {loading ? <div className={classes.flex}><CircularProgress /></div>
            : error ? <Typography variant={'h2'} component={'h6'}>Виникла помилка</Typography>
                : (product && <div>
                    <div>
                        <IconButton aria-label="Назад" color="inherit"  className={classes.arrow} onClick={() => history.goBack()}>
                            <ArrowBackIcon/>
                        </IconButton>
                        <Grid container justify={'center'}>
                            <Grid item className={classes.mg + " " + classes.mt50}>
                                <Paper elevation={0}>
                                    <img src={product.imageUrl} className={classes.img} alt="IMG"/>
                                </Paper>
                            </Grid>
                            <Grid item className={classes.mg}>
                                <FullWidthTabs product={product}/>
                            </Grid>
                        </Grid>
                    </div>

            </div>)
        }
    </div>
}

export default ProductDetail

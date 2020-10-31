import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {setAlert} from "../store/actions/alertActions";
import {addToCart} from "../store/actions/cartActions";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        [theme.breakpoints.down('xs')]: {
            width: '400px'
        },
        '@media (max-width: 420px)' : {
            width: 300
        }
    },
    prices: {
        display: 'flex',
        marginTop: 10
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
    mg: {
      margin: '10px 0'
    },
    text: {
        fontWeight: 700,
    },
    mb: {
        marginBottom: 15,
        display: 'block'
    }


}));

export default function FullWidthTabs({product}) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const addToCartProduct = () => {
        dispatch(addToCart(product, 1))
        dispatch(setAlert('Товар доданий в корзину.', 'success'))
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Інформація" {...a11yProps(0)} />
                    <Tab label="Додаткова інформація" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Typography variant={'h3'} component={'span'} gutterBottom className={classes.mb}>{product.title}</Typography>
                    <Typography component={'span'} style={{display: 'block'}}>{product.description}</Typography>
                    <Typography component={'span'} style={{display: 'block'}} className={classes.mg}>Категорія: <span className={classes.text}>{product.category.title}</span></Typography>
                    <Typography component={'span'} style={{display: 'block'}} className={classes.mg}>Країна виробника: <span className={classes.text}>{product.country}</span></Typography>
                    <Typography component={'span'} style={{display: 'block'}} className={classes.mg}>Бренд: <span className={classes.text}>{product.brand}</span></Typography>
                    <Typography component={'span'} style={{display: 'block'}} className={classes.mg}>Ємкість: <span className={classes.text}>{product.size/1000} л.</span></Typography>
                    <span className={classes.prices}>
                        <Typography component={'span'} style={{display: 'block'}} className={classes.price}>{product.newPrice} грн</Typography>
                        {(product.newPrice !== product.price) && <sup className={classes.newprice}>{product.price}</sup>}
                    </span>
                    {product.isAvailable ?
                        <Button variant="contained" color="primary" size={"large"} style={{marginTop:20}} onClick={addToCartProduct}>
                            Замовити
                        </Button>
                        :
                        <Button variant="contained" color="default" size={"large"} style={{marginTop:20}} disabled>
                            Немає в наявності
                        </Button>
                    }

                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Typography variant={'h4'} component={'span'} className={classes.mb} gutterBottom>Метод застосування</Typography>
                    <Typography component={'span'} style={{display: 'block'}}>{product.method}</Typography>
                    <Typography variant={'h4'} component={'span'} className={classes.mb} style={{marginTop: 20}} gutterBottom>Склад</Typography>
                    <Typography component={'span'} style={{display: 'block'}}>{product.composition}</Typography>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}

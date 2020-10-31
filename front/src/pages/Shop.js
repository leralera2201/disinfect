import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductItem from "./../components/ProductItem";
import RightSideBar from "../components/RightSideBar";
import SortIcon from '@material-ui/icons/Sort';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../store/actions/categoryActions";
import {getFilters, getProducts} from "../store/actions/productActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '95vw',
        margin: '0 auto',
        marginTop: 30,
        minHeight: 500
    },
    filter: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 30,
        marginBottom: 30
    },
    flex: {
        width: '100%',
        // minHeight: 500,
        display: 'flex',
        justifyContent: 'center',
    }
}));

export const CategoryContext = React.createContext()
export const CountryContext = React.createContext()
export const PriceContext = React.createContext()

export default function Shop({search}) {
    const classes = useStyles();
    const {categories, loading, error} = useSelector(state => state.categories)
    const {products, loading: productsLoading, error: productsError} = useSelector(state => state.products)
    const {loading: filtersLoading, error: filtersError, countries, minPrice, maxPrice} = useSelector(state => state.filters)
    const dispatch = useDispatch()
    const [value, setValue] = React.useState([minPrice, maxPrice]);
    const [sortOrder, setSortOrder] = React.useState('');
    const [categoriesCheck, setCategoriesCheck] = useState({})
    const [countriesCheck, setCountriesCheck] = useState({})

    const userCategories = categories.map(el => categoriesCheck[el._id] ? el.title : undefined).filter(el => el !== undefined)
    const userCountries = countries.map((el, index) => countriesCheck[index.toString()] ? el : undefined).filter(el => el !== undefined)


    const [anchorEl, setAnchorEl] = React.useState(null);
    let ids = []


    useEffect(() => {
        setValue([minPrice, maxPrice])
    }, [minPrice, maxPrice])

    useEffect(() => {
        window.scrollTo(0,0)
        dispatch(getCategories())
        dispatch(getFilters())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(countries.length > 0){
            for(let i in countries){
                setCountriesCheck(prev => ({...prev, [i.toString()]: true}))
            }
        }
    }, [countries])

    useEffect(() => {
        if(categories.length > 0){
            ids = categories.map(el => el._id)
            for(let id of ids){
                setCategoriesCheck((prev) => ({...prev, [id]: true}))
            }
        }
    }, [categories])

    useEffect(() => {
        dispatch(getProducts(search, userCategories, userCountries, sortOrder, value[0], value[1]))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortOrder, search])

    const handleChangeCategories = (event) => {
        setCategoriesCheck({...categoriesCheck, [event.target.name] : event.target.checked});
    };

    const handleChangeCountries = (event) => {
        setCountriesCheck({...countriesCheck, [event.target.name] : event.target.checked});
    };

    const handleChangePrice = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onSortClick = (sorting) => {
        setSortOrder(sorting)
        handleClose()
    }

    const dispatchGetProducts = () => {
        dispatch(getProducts(search, userCategories, userCountries, sortOrder, value[0], value[1]))

    }
    return (
        <CategoryContext.Provider value={{handleChangeCategories, categoriesCheck, loading, error, categories}}>
        <div className={classes.root}>
            <div className={classes.filter}>
                <CountryContext.Provider value={{countriesCheck, handleChangeCountries, countries}}>
                    <PriceContext.Provider value={{value, handleChangePrice}}>
                        <RightSideBar dispatchGetProducts={dispatchGetProducts} error={filtersError} loading={filtersLoading}/>
                    </PriceContext.Provider>
                </CountryContext.Provider>
                <div>
                    <IconButton aria-label="Фільтри" color="inherit" onClick={handleClick}>
                        <SortIcon/>
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => onSortClick('lowest')}>Від дешевих до дорогих</MenuItem>
                        <MenuItem onClick={() => onSortClick('highest')}>Від дорогих до дешевих</MenuItem>
                        <MenuItem onClick={() => onSortClick('')}>За новизною</MenuItem>
                    </Menu>
                </div>
            </div>

            <Grid container spacing={3}>
                {productsLoading ? <div className={classes.flex}><CircularProgress /></div> :
                    productsError ? <Typography variant={'h2'} component={'h6'}>Виникла помилка</Typography>
                        :
                        products.length === 0 ?
                            <Typography variant={'h2'} component={'h6'}>Немає активних товарів</Typography>
                            :
                            products.map(product => <ProductItem key={product._id} product={product}/>)
                }
            </Grid>
        </div>
        </CategoryContext.Provider>
    );
}

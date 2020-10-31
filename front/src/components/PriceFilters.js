import React, {useContext} from 'react';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import {PriceContext} from "../pages/Shop";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    price: {
        marginTop: 20,
        width: 200
    },
    mg: {
        margin: '10px 0'
    }
}))

export default function PriceFilter() {
    const classes = useStyles()
    const {value, handleChangePrice} = useContext(PriceContext)
    const {maxPrice, minPrice} = useSelector(state => state.filters)

    return (
            <div className={classes.price + " " + classes.mg}>
                <Typography variant='h5' component={'h2'} style={{textAlign: 'center', marginBottom: 10}}> Ціна</Typography>
                <Slider
                    value={value}
                    max={maxPrice}
                    min={minPrice}
                    onChange={handleChangePrice}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                />
            </div>
    );
}

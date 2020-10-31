import React, {useContext} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {CountryContext} from "../pages/Shop";

const useStyles = makeStyles(theme => ({
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    mg: {
        margin: '10px 0'
    }
}))

export default function CountryFilter() {
    const { countriesCheck, handleChangeCountries, countries} = useContext(CountryContext)
    const classes = useStyles()

    return (
            <div className={classes.mg}>
                <Typography variant='h5' component={'h2'} style={{textAlign: 'center', marginBottom: 10}}>Країна виробника</Typography>
                {countries.length === 0 ? 'Активних країн немає'
                :
                    countries.map((el, index) =>  <div key={el} className={classes.flex}>
                            <Checkbox
                                color="default"
                                name={index.toString()}
                                checked={countriesCheck[index.toString()]}
                                onChange={handleChangeCountries}
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                            />
                            <Typography>{el}</Typography>
                        </div>
                    )
                }
            </div>

    );
}

import React, {useContext} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {CategoryContext} from "../pages/Shop";


const useStyles = makeStyles(theme => ({
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    mg: {
        margin: '10px 0'
    }
}))

export default function CategoryFilter() {
    const {handleChangeCategories, categoriesCheck, loading, error, categories} = useContext(CategoryContext)
    const classes = useStyles()

    return (
            <div className={classes.mg}>
                <Typography variant='h5' component={'h2'} style={{textAlign: 'center', marginBottom: 10}}>Категорії</Typography>
                {loading ? 'Загрузка...' :
                    error ? error :
                        categories.length === 0 ? 'Активних категорій немає ' :
                            categories.map(el =>  <div className={classes.flex} key={el._id}>
                                    <Checkbox
                                        color="default"
                                        name={el._id}
                                        checked={categoriesCheck[el._id]}
                                        onChange={handleChangeCategories}
                                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                                    />
                                    <Typography>{el.title}</Typography>
                                </div>
                            )
                }
            </div>
    );
}

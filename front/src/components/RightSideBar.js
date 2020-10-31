import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import Filters from "./Filters";

const useStyles = makeStyles({
    list: {
        width: 300,
        display: 'flex',
        justifyContent: 'center'
    },
    fullList: {
        width: 'auto',
    },
    flex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default function RightSideBar({dispatchGetProducts, error, loading}) {
    const classes = useStyles();
    const [right, setRight] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setRight(open);
    };

    const onSubmit = () => {
        dispatchGetProducts()
        setRight(false)
    }

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            // onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem>
                    <Filters error={error} loading={loading}/>
                </ListItem>
                <ListItem className={classes.flex}>
                    <Button variant="contained" color="primary" onClick={onSubmit}>Застосувати</Button>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
                <React.Fragment>
                    <Button
                              color="default"
                              onClick={toggleDrawer(true)}
                              startIcon={<FilterListIcon />}>
                        Фільтри
                    </Button>
                    <SwipeableDrawer
                        anchor={'right'}
                        open={right}
                        onClose={toggleDrawer( false)}
                        onOpen={toggleDrawer( true)}
                    >
                        {list()}
                    </SwipeableDrawer>
                </React.Fragment>

        </div>
    );
}

import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        right: 20,
        top: 20,
        zIndex: 3,
        maxWidth: '40%',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '80%',
        },
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function AlertComponent() {
    const classes = useStyles();
    const [open, setOpen] = React.useState({});
    const alerts = useSelector(state => state.alert)
    useEffect(() => {
        for (let i of alerts){
            setOpen({...open, [i.id]: true})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alerts])

    return (
        <div className={classes.root}>
            {alerts.length > 0  && alerts.map(alert =>  <Collapse key={alert.id} in={Object.keys(open).length > 0}>
                <Alert severity={alert.type}
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               name={alert.id}
                               size="small"
                               onClick={() => {
                                   setOpen({...open, [alert.id]: false});
                               }}
                           >
                               <CloseIcon fontSize="inherit" />
                           </IconButton>
                       }
                >
                   {alert.msg}
                </Alert>
            </Collapse>)}

        </div>
    );
}

import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import BgImg from './../img/bg.jpg'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
   img: {
       background: 'rgba(3,27,21,0.3)',
       width: '100%',
       objectFit: 'cover',
       maxHeight: '90vh'
   }
}));


const Home = () => {
    const classes = useStyles()
    return <div>
        <Paper elevation={0}>
            <img src={BgImg} className={classes.img} alt="IMG"/>
            <div>
                <Typography>Антисептики та дезінфікуючі засоби</Typography>
                <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt hic nobis, officia repudiandae tempora voluptatum.</Typography>
            </div>
        </Paper>
    </div>
}

export default Home

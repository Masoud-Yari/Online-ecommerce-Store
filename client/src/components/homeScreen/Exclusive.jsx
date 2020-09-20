import React from 'react';
import {Button, Grid, Typography} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#f2f2f2',
        padding: '100px 10px'
    },
    image: {
        width: '100%'
    },
    p: {
        marginTop: 30,
        marginBottom: 30
    },
    btn: {
        backgroundColor: '#19CE96',
        color: '#000',
        fontWeight: 'bold',
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        borderRadius: 30,
        transition: 'all 0.5s ease',
        '&:hover': {
            backgroundColor: 'rgba(25, 206, 150, 0.5)',
            color: '#000',
        }
    },
    textContainer: {
        marginBottom: 100,
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        }
    }
  }));

const Exclusive = () => {
    
    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.root}  justify="space-evenly" alignItems="center" >
                <Grid item md={4} xs={10} className={classes.textContainer} >
                    <Typography 
                    className={classes.overline} 
                    variant="subtitle1" 
                    component="p"
                    >
                        Exclusive Available On M.Y Store
                    </Typography>
                    <Typography variant="h3" component="h1">Galaxy Note 8</Typography>
                    <Typography 
                    className={classes.p} 
                    variant="body1"
                    >
                        Lorem ipsum dolor consectetur elit. <br />Odit voluptatum molestiae!
                    </Typography>
                    <Button 
                    href="/products" 
                    className={classes.btn} 
                    endIcon={<ArrowForwardIosIcon />} 
                    >
                        Buy Now
                    </Button>
                </Grid>
                <Grid item  md={3} xs={8} >
                    <img className={classes.image} src="/images/note8.png" alt="Galaxy Note"/>
                </Grid>
            </Grid>
        </>
    )
}

export default Exclusive;

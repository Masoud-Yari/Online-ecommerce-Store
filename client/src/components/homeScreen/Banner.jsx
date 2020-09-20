import React from 'react';
import {Button, Grid, Typography, Box, Hidden} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%'
    },
    h2: {
        [theme.breakpoints.down('sm')]: {
            color: '#fff',
            marginTop: 30
        }
    },
    p: {
        marginTop: 30,
        marginBottom: 30,
        [theme.breakpoints.down('sm')]: {
            color: '#fff'
        }
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
    overlay: {
        height: '100vh',
        position: 'absolute',   
        top: 0,
        zIndex: -10
    },
    overlayBlack: {
        width: '50%',
        backgroundColor: '#000',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    overlayWhite: {
        width: '50%',
        backgroundColor: '#fff',
        [theme.breakpoints.down('sm')]: {
            width: 0
        }
    },
    imgContainer: {
        alignSelf: 'center',
        order: 1,
        [theme.breakpoints.down('sm')]: {
            order: 2,
            width: '80%'
        }
    },
    textContainer: {
        textAlign: 'center',
        background: 'transpatent',
        order: 2,
        [theme.breakpoints.down('sm')]: {
            order: 1
        }
    }
  }));

const Banner = () => {

    const classes = useStyles();
    
    return (
        <>
            <Grid container >
                <Grid item md={6} sm={12} >
                    <Box component="div" className={`${classes.overlay} ${classes.overlayBlack}`}/>
                </Grid>
                <Hidden smDown>
                    <Grid item md={6} sm={12}>
                        <Box component="div" className={`${classes.overlay} ${classes.overlayWhite}`} />
                    </Grid>
                </Hidden>
            </Grid>
            <Grid container style={{ height: '100vh' }}  justify="space-evenly" alignItems="center" >
                <Grid item className={classes.imgContainer} md={6} sm={12}>
                    <img className={classes.image} src="/images/apple-watch.png" alt="apple-watch"/>
                </Grid>
                <Grid item md={5} sm={12} className={classes.textContainer} >
                    <Typography 
                    className={classes.h2} 
                    variant="h2" 
                    component="h1"
                    >
                        Give Your Hand <br/>A New Tech.
                    </Typography>
                    <Typography 
                    className={classes.p} 
                    variant="body1"
                    >
                        Lorem ipsum dolor sit amet consectetur elit. <br />Odit magnam voluptatum molestiae!
                    </Typography>
                    <Button 
                    href="/products" 
                    className={classes.btn} 
                    endIcon={<ArrowForwardIosIcon />} 
                    >
                        Buy Now
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Banner;

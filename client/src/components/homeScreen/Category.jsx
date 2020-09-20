import React from 'react';
import {Container, Grid, Typography, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        paddingTop: 100, 
        paddingBottom: 100, 
        marginBottom: 20
    }, 
    image: {
        width: '100%',
        height: '100%',
        transition: 'opacity 0.5s ease',
        '&:hover': {
            opacity: 0.5,
        }
    },
    title: {
        textAlign: 'center',
        marginBottom: 100
    }
  });

const Category = () => {

    const classes = useStyles();
    
    return (
        <>
            <Box className={classes.root}>
            <Container  >
                <Typography className={classes.title} variant="h2" component="h1">Category</Typography>
                <Grid  container spacing={2} >
                    <Grid item xs={6}  sm={3}>
                        <Link to={'/products'}>
                            <img className={classes.image} src="/images/watch-category.jpg" alt="watch"/>
                        </Link>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Link to={'/products'}>
                            <img className={classes.image} src="/images/mobile-category.jpg" alt="mobile"/>
                        </Link>
                    </Grid>
                    <Grid item xs={6}  sm={3}>
                        <Link to={'/products'}>
                            <img className={classes.image} src="/images/camera-category.jpg" alt="camera"/>
                        </Link>
                    </Grid>
                    <Grid item xs={6}  sm={3}>
                        <Link to={'/products'}>
                            <img className={classes.image} src="/images/tablet-category.jpg" alt="tablet"/>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
            </Box>
        </>
    )
}

export default Category;

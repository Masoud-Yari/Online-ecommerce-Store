import React, {useEffect} from 'react';
import {Container, Grid, Typography, Box, CircularProgress} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import {getProducts} from '../../actions/productsAction';
import ProductCard from '../ProductCard';

const useStyles = makeStyles({
    root: {
        paddingTop: 100, 
        paddingBottom: 100
    },
    title: {
        textAlign: 'center',
        marginBottom: 100
    }
  });

const Latest = () => {
    
    const classes = useStyles();

    const {products, loading, error} = useSelector(state => state.productsList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <>
            <Box className={classes.root}>
            <Container  >
                <Typography className={classes.title} variant="h2" component="h1">Latest Products</Typography>
                <Grid  container spacing={3} justify="center" >
                {loading ? 
                    <div className={classes.progress}>
                        <CircularProgress />
                    </div> : 
                    error ? <h1>{error}</h1> : 
                    products.map((product, index) => {
                        if(index >= products.length - 8) {
                            return (
                                <Grid key={product._id} item xs={11} sm={6} md={3}>
                                    <ProductCard product={product}/>
                                </Grid>
                            );
                        }else return null;
                    })
                }
                </Grid>
            </Container>
            </Box>
        </>
    )
}

export default Latest;
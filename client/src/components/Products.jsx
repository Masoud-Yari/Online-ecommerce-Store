import React, {useState, useEffect} from 'react';
import {
    Container, 
    Grid, 
    CircularProgress, 
    Button, 
    Paper, 
    Typography, 
    TextField, 
    ButtonGroup
} from '@material-ui/core';
import ProductCard from './ProductCard';
import {useSelector, useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {getProducts} from '../actions/productsAction';

const useStyles = makeStyles(theme => ({
    root: {
      marginTop: 20, 
      marginBottom: 20
    }, 
    progress: {
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%', 
        height: '80vh'
    },
    paper: {
        padding: 20, 
        marginBottom: 40
    }
  }));

const Products = () => {

    const classes = useStyles();

    const [displayProducts, setDisplayProducts] = useState([]);
    const [category, setCategory] = useState('');

    const {products, loading, error} = useSelector(state => state.productsList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        // Declare a switch statement to handle categories buttons
        switch(category) {
            case 'all':
                return setDisplayProducts(products);
            case 'mobile':
                return setDisplayProducts(products.filter(product => product.category === 'mobile'));
            case 'tablet':
                return setDisplayProducts(products.filter(product => product.category === 'tablet'));
            case 'camera':
                return setDisplayProducts(products.filter(product => product.category === 'camera'));
            case 'watch':
                return setDisplayProducts(products.filter(product => product.category === 'watch'));
            default:
                return setDisplayProducts(products);
        }
    }, [category, products])

    const handleSearch = e => {
        setDisplayProducts(products.filter(product => {

            // Compare index of product name by searched text
            if(product.name.toLowerCase().indexOf(e.target.value) === -1) return null;
            else return true; 
        }))
    }

    
    return (
        <Container className={classes.root}>
            <Paper elevation={6} className={classes.paper}>
                <Grid container justify="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField 
                        fullWidth 
                        size="small" 
                        variant="outlined" 
                        placeholder="Search By Name..." 
                        onChange={handleSearch}/>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Typography variant="overline" style={{fontSize: 17}} display="inline">Category:  </Typography>
                        <ButtonGroup  variant="contained" size="small" color="inherit">
                            <Button onClick={e => setCategory('all')}>All</Button>
                            <Button onClick={e => setCategory('mobile')}>Mobile</Button>
                            <Button onClick={e => setCategory('tablet')}>Tablet</Button>
                            <Button onClick={e => setCategory('camera')}>Camera</Button>
                            <Button onClick={e => setCategory('watch')}>Watch</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Paper>
            <Grid container spacing={4} justify="center">
                {loading ? 
                    <div className={classes.progress}>
                        <CircularProgress />
                    </div> : 
                    error ? <h1>{error}</h1> : displayProducts ?
                    displayProducts.map(product => (
                        <Grid key={product._id} item xs={10} sm={6} md={4} lg={3}>
                            <ProductCard product={product}/>
                        </Grid>
                    )) : 
                    <div className={classes.progress}>
                        <CircularProgress />
                    </div>
                }
            </Grid>
        </Container>
    )
}

export default Products;

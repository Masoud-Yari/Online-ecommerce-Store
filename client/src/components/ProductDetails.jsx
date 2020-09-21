import React, {useState, useEffect} from 'react';
import {Container, 
        Grid,
        Typography, 
        Paper, 
        List, 
        ListItem, 
        ListItemText, 
        Select, 
        MenuItem, 
        Button, 
        Box, 
        CircularProgress
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Rating from '@material-ui/lab/Rating';
import {useSelector, useDispatch} from 'react-redux';
import {getProductDetails} from '../actions/productsAction';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      paddingTop: 20, 
      paddingBottom: 20,
      fontWeight: 900,
      backgroundColor: '#f1f1f1'
    }, 
    progress: {
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%', 
        height: '80vh'
    },
    image: {
        width: '100%',
        maxHeight: 500,
        height: '100%',
        cursor: 'pointer',
        objectFit: 'cover'
    },
    cartBtn: {
        marginLeft: 20,
        backgroundColor: '#000',
        borderRadius: 0,
        color: '#fff',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }
    },
    rating: {
      color: '#19CE96'
    },
    cartPaper: {
        borderRadius: 20,
        backgroundColor: '#f1f1f1'
    }
}));

const ProductDetails = (props) => {

    const classes = useStyles();

    const [qty, setQty] = useState(1);
    
    const {productDetails, loading, error} = useSelector(state => state.productDetails);
    const dispatch = useDispatch();
    
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        if(productDetails) {
            setImageSrc(productDetails.image);
        }
    },[productDetails])

    useEffect(() => {
        dispatch(getProductDetails(props.match.params.id));
    }, [dispatch, props.match.params.id]);
    
    
    const handleAddToCart = e => {
        // Send qty of item in url
        props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
    }

    const handleImageSelect = e => {
        setImageSrc(e.target.src);
    }

    return (
        <Container maxWidth={false} className={classes.root}>
            <Button href="/products" color="inherit" startIcon={<ArrowBackIosIcon />}>
                Back
            </Button>
            {loading ? 
                <div className={classes.progress}>
                    <CircularProgress />
                </div> : 
            error ? <h1>{error}</h1> : 
                    <Grid style={{marginTop: 10}} container spacing={4} justify="space-between">
                        <Grid item container spacing={1} direction="column" xs={12} md={6} >
                            <Grid item >
                                <img 
                                className={classes.image} 
                                src={imageSrc} 
                                alt={productDetails.name} />
                            </Grid>
                            <Grid item container spacing={1}>
                                <Grid item xs={3}>
                                    <img 
                                    className={classes.image} 
                                    src={productDetails.image} 
                                    alt="" 
                                    onClick={handleImageSelect}/>
                                </Grid>
                                <Grid item xs={3}>
                                    <img 
                                    className={classes.image} 
                                    src="/images/tablet-category.jpg" 
                                    alt="" 
                                    onClick={handleImageSelect}/>
                                </Grid>
                                <Grid item xs={3}>
                                    <img 
                                    className={classes.image} 
                                    src="/images/camera-category.jpg" 
                                    alt="" 
                                    onClick={handleImageSelect}/>
                                </Grid>
                                <Grid item xs={3}>
                                    <img 
                                    className={classes.image} 
                                    src="/images/watch-category.jpg" 
                                    alt="" 
                                    onClick={handleImageSelect}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={2} xs={12} md={6} >
                            <Grid item xs={12}>
                                <Paper elevation={0} style={{backgroundColor: '#f1f1f1'}}>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary={<Typography variant="h4" style={{fontWeight: 900}}>{productDetails.name}</Typography>}
                                                secondary={productDetails.brand}
                                            />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText
                                            primary={
                                                <Box borderColor="transparent">
                                                <Rating 
                                                className={classes.rating} 
                                                name="read-only" 
                                                value={productDetails.rating} 
                                                precision={0.5} 
                                                readOnly />
                                                <Typography variant="caption">({productDetails.reviews} Reviews)</Typography>
                                                </Box>
                                            }
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText
                                            primary={<Typography variant="h3" style={{fontWeight: 'bold'}}>${productDetails.price}</Typography>}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText
                                            primary={<Typography style={{fontWeight: 700}} variant="overline">Description</Typography>}
                                            secondary={<Typography variant="subtitle2">{productDetails.description}</Typography>}
                                        />
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={0} className={classes.cartPaper}>
                                    <List style={{width: '100%'}}>
                                        <ListItem alignItems="center">
                                            <ListItemText
                                            primary={`Total`}
                                            secondary={<Typography variant="h4">${productDetails.price * qty}</Typography>}
                                            />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText
                                            primary={'State'}
                                            secondary={productDetails.numberOfProduct > 0 ? `InStock` : 'Unavailable'}
                                        />
                                        </ListItem>
                                        <ListItem>
                                            {productDetails.numberOfProduct > 0 ?
                                            <>
                                                <Select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(productDetails.numberOfProduct).keys()].map(item => (
                                                    <MenuItem key={item} value={item + 1}>{item + 1}</MenuItem>
                                                ))}
                                                </Select>
                                                <Button className={classes.cartBtn} onClick={handleAddToCart} variant="contained" >
                                                    ADD to Cart
                                                </Button> 
                                            </>: 
                                            <>
                                                <Select  disabled>
                                                    <menuItem>1</menuItem>
                                                </Select>
                                                <Button className={classes.cartBtn} disabled variant="contained" >
                                                    ADD to Cart
                                                </Button>
                                            </>
                                            }
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>}
        </Container>
    )
}

export default ProductDetails;
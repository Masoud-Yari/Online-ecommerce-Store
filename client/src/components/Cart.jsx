import React, {useEffect} from 'react';
import {Container, 
    Grid,
    Typography, 
    Paper, 
    List, 
    ListItem, 
    ListItemText, 
    Button, 
    ButtonBase, 
    Select, 
    MenuItem
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {addItemToCart, removeItemFromCart} from '../actions/cartAction';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
      paddingTop: 20, 
      paddingBottom: 20,
      backgroundColor: '#f1f1f1'
    },
    title: {
        marginBottom: 50,
        marginTop: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    itemPaper: {
        backgroundColor: '#E5E9EA',
        padding: 10
    },
    checkoutPaper: {
        width: '100%', 
        height: 250,
        color: '#fff', 
        padding: 10, 
        backgroundColor: '#1f1f1f'
    },
    checkoutBtn: {
        margin: '20px auto',
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 0,
        transition: 'all 0.5s ease',
        borderColor: '#1f1f1f',
        backgroundColor: '#f1f1f1',
        color: '#1f1f1f',
        '&:hover': {
            backgroundColor: '#000',
            borderColor: '#f1f1f1',
            color: '#f1f1f1',
        }
    },
    link: {
      color: '#000',
      textDecoration: 'none'
    },
    paper: {
      padding: 10,
      margin: '4px auto',
      width: '80%',
      height: 110,
      backgroundColor: '#E5E9EA'
    },
    imageBtn: {
      width: 100,
      height: 100,
      borderRadius: '50%',
      overflow: 'hidden'
    },
    img: {
      Width: '100%',
      height: '100%',
    }
  }));

const Cart = (props) => {
    const classes = useStyles();

    const {cartItems} = useSelector(state => state.cart);
    const dispatch = useDispatch();

    // split qty with =  
    const qty = props.location.search.split('=')[1];
    const productId = props.match.params.id;

    useEffect(() => {
        
        dispatch(addItemToCart(productId ,qty))
        
    }, [dispatch, productId, qty])

    // Write a function to compute number of items that are in cart
    const countCartItem = () => {
        return cartItems.map(cartItem => Number(cartItem.qty)).reduce((total, num) => total + num, 0);
    }

    // Write a function to calculate sum of item's price
    const subTotal = () => {
        return cartItems.map(cartItem => Number(cartItem.qty) * cartItem.price).reduce((total, num) => total + num, 0);
    }

    // Write a function to calculate tax by given percent
    const tax = (percent) => {
        return parseFloat((subTotal() * (percent / 100)).toFixed(2));
    }

    const handleCheckout = e => {
        // Only run if we have at least one item in our cart
        if(cartItems.length > 0){
            // if we are already sign in redirect to shipping if not go to signin screen
            props.history.push('/signin?redirect=shipping');
        }
    }

    return (
        <Container maxWidth={false} className={classes.root}>
            <Button href="/products" color="inherit" startIcon={<ArrowBackIosIcon />}>
                Back
            </Button>
            <Typography className={classes.title} variant="h5">
                Your Shopping Cart
            </Typography> 
            <Grid container spacing={3}>
                <Grid item container xs={12} sm={8} spacing={1}>
                {cartItems.length < 1 ? <Typography>Your Cart is Empty</Typography> :
                    cartItems.map(item => (
                        <Grid key={item.id} item xs={12} >
                            <Paper className={classes.itemPaper}>
                                <Grid 
                                container 
                                justify="space-around" 
                                alignItems="center" 
                                spacing={2}
                                >
                                    <Grid item xs={7} md={2}>
                                    <ButtonBase className={classes.imageBtn}>
                                        <img className={classes.img} alt={item.name} src={item.image} />
                                    </ButtonBase>
                                    </Grid>
                                    <Grid item xs={5} md={2}>
                                        <Link className={classes.link} to={`/products/${item.id}`}>
                                            <Typography 
                                            gutterBottom 
                                            style={{fontWeight: '700'}} 
                                            variant="subtitle1"
                                            >
                                                {item.name}
                                            </Typography>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={3} md={2}>
                                        <Select 
                                        value={item.qty} 
                                        onChange={(e) => dispatch(addItemToCart(item.id, e.target.value))} 
                                        >
                                            {/* build an array equal to number of product that store in database */}
                                            {[...Array(item.numberOfProduct).keys()].map(num => (
                                                <MenuItem key={num} value={num + 1}>{num + 1}</MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={3} md={2}>
                                    <Typography style={{fontWeight: '700'}} variant="subtitle1">
                                        ${item.price}
                                    </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={2}>
                                        <Typography 
                                        variant="body2" 
                                        style={{ cursor: 'pointer' }} 
                                        onClick={() => dispatch(removeItemFromCart(item.id))}
                                        >
                                            Remove
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>                    
                        </Grid>
                    ))}
                </Grid>
                <Grid item container xs={12} sm={4}>
                    <Paper className={classes.checkoutPaper}>
                        <List dense style={{width: '100%'}}>
                            <ListItem>
                                <ListItemText
                                    primary={<Typography align="center">{countCartItem()} Items Selected</Typography>}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={<Typography variant="overline">Subtotal</Typography>}
                                />
                                <ListItemText 
                                primary={<Typography align="right">${subTotal()}</Typography>}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                primary={<Typography variant="overline">Tax</Typography>}
                                />
                                <ListItemText 
                                primary={<Typography align="right">${tax(9)}</Typography>}
                                />
                            </ListItem>
                            <ListItem>
                            <ListItemText
                                primary={<Typography variant="overline">Total</Typography>}
                            />
                            <ListItemText 
                                primary={<Typography align="right">${subTotal() + tax(9)}</Typography>}
                            />
                            </ListItem>
                            <ListItem>
                                <Button 
                                className={classes.checkoutBtn} 
                                onClick={handleCheckout} 
                                variant="outlined" 
                                color="secondary" 
                                >
                                    Checkout
                                </Button> 
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Cart;

import React from 'react';
import {Button, 
        Container, 
        CssBaseline, 
        Typography,
        List,
        ListItem,
        ListItemText,
        Grid,
        Paper,
        Box
    } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';

const useStyle = makeStyles((theme) => ({
    orderContainer: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    palceOrderPaper: {
        color: '#fff', 
        padding: 10, 
        backgroundColor: '#1f1f1f'
    },
    submit: {
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
    back: {
        borderRadius: 0,
        borderColor: '#f1f1f1',
        marginRight: 10,
        color: '#f1f1f1'
    },
    title: {
        fontWeight: 700
    },
    imageBox: {
      width: 100,
      height: 100,
      borderRadius: '50%',
      overflow: 'hidden'
    },
    img: {
      Width: '100%',
      height: '100%',
    },
    itemPaper: {
        backgroundColor: '#f1f1f1',
        padding: 10
    },
    shippingPaper: {
        backgroundColor: '#f1f1f1'
    }
}))

const PlaceOrder = ({back}) => {

    const classes = useStyle();

    const {cart} = useSelector(state => state);

    // Write a function to calculate sum of item's price
    const subTotal = () => {
        return cart.cartItems.map(cartItem => Number(cartItem.qty) * cartItem.price).reduce((total, num) => total + num, 0);
    }

    // Write a function to calculate tax by given percent
    const tax = (percent) => {
        return parseFloat((subTotal() * (percent / 100)).toFixed(2));
    }

    // Shipping fea is free for orders more than 150
    const shippingFea = (fea) => {
        if(subTotal() >= 150) return 0;
        else return fea;
    }

    const handlePlaceOrder = () => {
        alert('OOPS! This is a sample website.')
    }

    return (
        <>
            <Container component="main" >
                <CssBaseline />
                <div className={classes.orderContainer}>
                    <Typography gutterBottom component="h4" variant="h4">
                    Order Details
                    </Typography>
                    <Grid container spacing={4} >
                    <Grid item container spacing={2} xs={12} md={8} >
                        <Grid item xs={12} >
                            <Paper className={classes.shippingPaper} elevation={0}>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                        primary={<Typography className={classes.title} variant="body1">Address</Typography>}
                                        secondary={cart.shipping.address}
                                        />
                                    </ListItem>
                                    <ListItem>
                                    <ListItemText
                                        primary={<Typography className={classes.title} variant="body1">City</Typography>}
                                        secondary={cart.shipping.city}
                                    />
                                    </ListItem>
                                    <ListItem>
                                    <ListItemText
                                        primary={<Typography className={classes.title} variant="body1">Postal Code</Typography>}
                                        secondary={cart.shipping.postalCode}
                                    />
                                    </ListItem>
                                    <ListItem>
                                    <ListItemText
                                        primary={<Typography className={classes.title} variant="body1">Country</Typography>}
                                        secondary={cart.shipping.country}
                                    />
                                    </ListItem>
                                    <ListItem>
                                    <ListItemText
                                        primary={<Typography className={classes.title} variant="body1">Payment</Typography>}
                                        secondary={cart.payment}
                                    />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item container xs={12} >
                            <Grid item container spacing={2}>
                                {cart.cartItems.length < 1 ? <Typography>Your Not Select Any Product</Typography> :
                                cart.cartItems.map(item => (
                                    <Grid key={item.id} item xs={12} >
                                        <Paper elevation={0} className={classes.itemPaper}>
                                            <Grid container justify="space-around" alignItems="center" spacing={2}>
                                                <Grid item xs={4}>
                                                <Box className={classes.imageBox}>
                                                    <img className={classes.img} alt={item.name} src={item.image} />
                                                </Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography gutterBottom style={{fontWeight: '700'}} variant="subtitle1">
                                                        {item.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography >{item.qty}</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography style={{fontWeight: '700'}} variant="subtitle1">
                                                        ${item.price}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>                    
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={10} className={classes.palceOrderPaper}>
                            <List>
                                <ListItem>
                                    <ListItemText
                                    primary={<Typography variant="overline">Subtotal</Typography>}
                                    />
                                    <ListItemText
                                    style={{textAlign: 'right'}}
                                    primary={<Typography>${subTotal()}</Typography>}
                                    />
                                </ListItem>
                                <ListItem>
                                <ListItemText
                                    primary={<Typography variant="overline">Tax</Typography>}
                                />
                                <ListItemText
                                    style={{textAlign: 'right'}}
                                    primary={<Typography>${tax(9)}</Typography>}
                                />
                                </ListItem>
                                <ListItem>
                                <ListItemText
                                    primary={
                                    <>
                                        <Typography display="block" variant="overline">Shipping Fea</Typography>
                                        <small>Shipping Fea is free for orders more than $150</small>
                                    </>
                                    }
                                />
                                <ListItemText
                                    style={{textAlign: 'right'}}
                                    primary={<Typography>${shippingFea(10)}</Typography>}
                                />
                                </ListItem>
                                <ListItem>
                                <ListItemText
                                    primary={<Typography variant="overline">Total</Typography>}
                                />
                                <ListItemText
                                    style={{textAlign: 'right'}}
                                    primary={<Typography>${subTotal() + tax(9) + shippingFea(10)}</Typography>}
                                />
                                </ListItem>
                                <ListItem>
                                <div>
                                    <Button variant="outlined" className={classes.back} onClick={back} >Back</Button>
                                    <Button className={classes.submit} onClick={handlePlaceOrder}>
                                        Place Order
                                    </Button>
                                </div>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
                </div>
            </Container>
        </>
    )
}

export default PlaceOrder;

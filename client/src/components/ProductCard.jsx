import React from 'react';
import {Card, 
        CardMedia, 
        CardContent, 
        CardActionArea, 
        List, ListItem, 
        ListItemText, 
        Box,
        Typography
      } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      maxWidth: 500,
      height: 330,
      transition: 'all 0.5s ease',
      '&:hover': {
        transform: 'scale(1.1)'
      }
    },
    media: {
      height: 150
    },
    rating: {
      color: '#19CE96'
    },
    link: {
      color: '#000',
      textDecoration: 'none'
    },
    bold: {
      fontWeight: 700
    }
  });

const ProductCard = ({product}) => {

    const classes = useStyles();
    
    return (
        <Card className={classes.root}>
            <CardActionArea>
              <Link to={`/products/${product._id}`}>
                <CardMedia
                    className={classes.media}
                    image={product.image}
                    title={product.name}
                />
              </Link>
            </CardActionArea>
            <CardContent>
            <List dense>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box borderColor="transparent">
                        <Rating 
                        className={classes.rating} 
                        name="read-only" 
                        value={product.rating} 
                        precision={0.5} 
                        readOnly />
                        <Typography variant="caption">({product.reviews} Reviews)</Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <ListItem>
                  <Link className={classes.link} to={`/products/${product._id}`}>
                    <ListItemText
                      primary={
                        <>
                      <Typography className={classes.bold} variant="h6">{product.name}</Typography>
                      <Typography className={classes.bold} variant="subtitle2">{product.brand}</Typography>
                      </>
                    }
                    />
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={<Typography className={classes.bold} variant="body2">${product.price}.00</Typography>}
                  />
                </ListItem>
            </List>
            </CardContent>
        </Card>
    )
}

export default ProductCard;

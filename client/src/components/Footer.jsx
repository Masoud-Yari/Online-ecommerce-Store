import React from 'react';
import {Grid, Typography, IconButton, List, ListItemAvatar, ListItem, ListItemText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InstagramIcon from '@material-ui/icons/Instagram';
import TelegramIcon from '@material-ui/icons/Telegram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '30px 10px',
        backgroundColor: '#000',
        color: '#f1f1f1',
        textAlign: 'center'
    },
    title: {
        color: '#19CE96'
    }
    
  }));

const Footer = () => {
    const classes = useStyles();
    return (
        <>
            <Grid container direction="column" className={classes.root} justify="center" alignItems="center">
                <Grid item container spacing={2}>
                    <Grid item xs={6} sm={3}>
                        <Typography 
                        className={classes.title} 
                        gutterBottom 
                        variant="h6" 
                        component="h1">
                            Why Us?
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                        <LooksOneIcon />
                                </ListItemAvatar>
                                <ListItemText primary="somthing" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                        <LooksTwoIcon />
                                </ListItemAvatar>
                                <ListItemText primary="somthing2" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                        <Looks3Icon />
                                </ListItemAvatar>
                                <ListItemText primary="somthing3" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={6} sm={3} >
                        <Typography 
                        className={classes.title} 
                        gutterBottom 
                        variant="h6" 
                        component="h1"
                        >
                            M.Y Online Store
                        </Typography>
                        <Typography 
                        variant="body2" 
                        component="p">
                            This is a sample site. <br />(not for commercial uses)
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Typography 
                        className={classes.title} 
                        gutterBottom 
                        variant="h6" 
                        component="h1">
                            Categories
                        </Typography>
                        <Typography display="block" variant="overline">Mobiles</Typography>
                        <Typography display="block" variant="overline">Tablets</Typography>
                        <Typography display="block" variant="overline">Cameras</Typography>
                        <Typography display="block" variant="overline">Watches</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3} >
                        <Typography 
                        className={classes.title} 
                        gutterBottom 
                        variant="h6" 
                        component="h1">
                            Follow Us
                        </Typography>
                        <IconButton color="inherit">
                            <InstagramIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <TelegramIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <FacebookIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item style={{margin: '40px auto'}}>
                    <Typography variant="overline" component="p">Copyright 2020 - Masoud Yari</Typography>
                    <Typography variant="subtitle2" component="p">masoudd.yarii@gmail.com</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default Footer;
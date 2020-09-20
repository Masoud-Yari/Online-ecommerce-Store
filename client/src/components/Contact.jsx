import React from 'react';
import {Container, Paper, Grid, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import InstagramIcon from '@material-ui/icons/Instagram';
import TelegramIcon from '@material-ui/icons/Telegram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';

const useStyle = makeStyles(theme => ({
    root: {
        marginTop: 150,
        marginBottom: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        backgroundColor: '#1f1f1f',
        color: '#f1f1f1',
        textAlign: 'center',    
        padding: 20
    },
    inputPaper: {
        color: '#1f1f1f',
        backgroundColor: '#f1f1f1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 40,
        height: '100%'
    },
    textArea: {
        resize: 'none', 
        width: '100%', 
        height: 100, 
        marginTop: 50
    }
}));

const Contact = () => {
    const classes = useStyle();
    return (
        <Container maxWidth="md" className={classes.root}>
            <Grid container justify="center" alignItems="center" >
                <Grid item xs={12} md={6} >
                    <Paper elevation={12} className={classes.paper}>
                        <Typography variant="h3">Contact Us</Typography>
                        <Grid container direction="column" justify="center" >
                            <Grid item xs={12} >
                                <List >
                                    <ListItem style={{marginTop: 10}}>
                                        <ListItemIcon >
                                            <LocationOnIcon style={{color: '#f1f1f1'}} />
                                        </ListItemIcon>
                                        <ListItemText 
                                        primary={<Typography>Lorem ipsum dolor elkekl eflefef consectetur elit.</Typography>}
                                        />
                                    </ListItem>
                                    <ListItem style={{marginTop: 10}}>
                                        <ListItemIcon>
                                            <AlternateEmailIcon style={{color: '#f1f1f1'}}/>
                                        </ListItemIcon>
                                        <ListItemText 
                                        primary={<Typography>Email</Typography>}
                                        />
                                    </ListItem>
                                    <ListItem style={{marginTop: 10}}>
                                        <ListItemIcon>
                                            <PhoneAndroidIcon style={{color: '#f1f1f1'}}/>
                                        </ListItemIcon>
                                        <ListItemText 
                                        primary={<Typography>Number</Typography>}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item>
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
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} >
                    <Paper elevation={12} className={classes.inputPaper}>
                        <TextField style={{marginTop: 20}} type="text" placeholder="Your Name"/>
                        <TextField style={{marginTop: 20}} type="text" placeholder="Your Email"/>
                        <textarea className={classes.textArea} type="text" placeholder="Type your message"/>
                        <Button style={{marginTop: 20}}>SEND</Button>
                    </Paper>
                </Grid>
            </Grid>
            
        </Container>
    )
}

export default Contact;

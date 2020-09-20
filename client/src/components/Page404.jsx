import React from 'react';
import { Button, Container, Paper, Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
    root: {
        marginTop: 150,
        marginBottom: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        padding: '5%',
        marginLeft: 50,
        marginRight: 50,
        backgroundColor: '#1f1f1f',
        color: '#f1f1f1',
        textAlign: 'center'
    },
    title: {
        fontWeight: 700
    }
}));

const Page404 = () => {

    const classes = useStyle();

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography className={classes.title} variant="h1" >NOT FOUND</Typography>
                <Typography gutterBottom className={classes.title} variant="h1" >404</Typography>
                <Button href="/" color="inherit">
                    Go to Home
                </Button>
            </Paper>
        </Container>
    )
}

export default Page404;

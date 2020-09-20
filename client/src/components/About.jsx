import React from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
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
        padding: 70,
        marginLeft: 50,
        marginRight: 50,
        backgroundColor: '#1f1f1f',
        color: '#f1f1f1'
    },
    paragraph: {
        marginTop: 30,
        lineHeight: 2
    }
}));

const About = () => {
    const classes = useStyle();
    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h2" >About Us</Typography>
                <Typography className={classes.paragraph} variant="body1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro totam ipsa vel ullam at rem, eligendi facilis voluptates sapiente pariatur qui, reprehenderit, hic incidunt corrupti harum debitis laboriosam! Possimus, facilis minus harum ex officiis similique totam voluptatem eum pariatur impedit sequi. Nobis saepe reprehenderit nulla repellat voluptatibus placeat dolorum porro adipisci modi facilis, voluptas magnam quia corrupti repellendus numquam consectetur tempora, vel cupiditate? Esse libero deserunt sunt voluptate consectetur iste quidem ad eum, quisquam hic, quae dicta. Nulla, iure odio!</Typography>
            </Paper>
        </Container>
    )
}

export default About;

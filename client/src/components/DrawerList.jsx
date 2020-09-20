import React from 'react';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

const useStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        minWidth: 200,
        margin: 'auto'
    },
    link: {
        textDecoration: 'none',
        color: '#000'
    },
    listItem: {
        marginBottom: theme.spacing(2)
    }
}));

const DrawerList = ({menuItems}) => {
    const classes = useStyle();
    return (
        <List component="nav" className={classes.root}>
            {menuItems.map(item => (
                <Link to={item.url} className={classes.link} key={item.title}>
                    <ListItem button className={classes.listItem}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                </Link>
            ))}
        </List>
    )
}

export default DrawerList;


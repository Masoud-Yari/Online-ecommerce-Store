import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../actions/usersAction';
import {
    Container, 
    Grid, 
    Button,
    Typography,
    TextField,
    CssBaseline,
    Link,
    Avatar,
    LinearProgress, 
    Paper
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
const useStyle = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#1f1f1f',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: '20px auto',
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 0,
        transition: 'all 0.5s ease',
        backgroundColor: '#1f1f1f',
        color: '#f1f1f1',
        '&:hover': {
            backgroundColor: '#000',
            borderColor: '#f1f1f1',
            color: '#f1f1f1',
        }
    }
}))

const SignIn = (props) => {

    const classes = useStyle();

    // If search exist go to that otherwise go to home page
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {userData, loading, error} = useSelector(state => state.signInUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if(userData) {
            props.history.push(redirect);
        }
    }, [userData, props.history, redirect])

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(signIn(email, password));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper elevation={10} className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign In
                </Typography>
                {loading ? 
                    <LinearProgress  /> : 
                    error ? <Typography variant="body1">{error}</Typography> : ''}
                <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    className={classes.submit}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item>
                    <Link 
                    color="textPrimary" 
                    href={redirect === '/' ? '/register' : `/register?redirect=${redirect}`} 
                    variant="body2"
                    >
                        Don't have an account? Sign Up
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default SignIn;

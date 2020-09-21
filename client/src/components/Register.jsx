import React, {useState, useEffect} from 'react';
import {register} from '../actions/usersAction';
import {useDispatch, useSelector} from 'react-redux';
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
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
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

const Register = (props) => {
    const classes = useStyle();

    // If search exist go to that otherwise go to home page
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRepassword] = useState('');

    const {userData, loading, error} = useSelector(state => state.registerUser);
    const dispatch = useDispatch();

    useEffect(() => {

        // compare password and repeated one if equal then redirect
        if(userData && password === rePassword) {
            props.history.push(redirect);
        }
    }, [userData, props.history, redirect, password, rePassword])   

    const handleSubmit = e => {
        e.preventDefault();
        if(password === rePassword) {
            dispatch(register(name, email, password, rePassword));
            props.history.push('/signin');
        }else{
            props.history.push('/register');
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                <AssignmentIndIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign Up
                </Typography>
                {loading ? 
                    <LinearProgress  /> : 
                    error ? <Typography variant="body1">{error}</Typography> : ''}
                <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    label="Full Name"
                    name="name"
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <TextField
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    name="rePassword"
                    label="Repeat Password"
                    type="password"
                    onChange={e => setRepassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container>
                    <Grid item>
                    <Link 
                    href={redirect === '/' ? '/signin' : `/signin?redirect=${redirect}`} 
                    color="textPrimary" 
                    variant="body2"
                    >
                        Already have an account? Sign In
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Register;
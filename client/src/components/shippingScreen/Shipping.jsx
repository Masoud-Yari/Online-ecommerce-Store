import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
    Container,
    Button,
    Typography,
    TextField,
    CssBaseline,
    Paper
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {addShipping} from '../../actions/cartAction';

const useStyle = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30
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

const Shipping = ({next}) => {
    const classes = useStyle();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const inputsFill = address && city && postalCode && country;

    const dispatch = useDispatch();

    const handleNext = () => {
      if(inputsFill) {
          dispatch(addShipping({address, city, postalCode, country}));
          next();
      }
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper elevation={12} className={classes.paper}>
                    <Typography component="h5" variant="h5">
                    Shipping
                    </Typography>
                    <form className={classes.form} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Address"
                            name="address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="City"
                            name="city"
                            value={city}
                            autoFocus
                            onChange={e => setCity(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Postal Code"
                            type="number"
                            name="postalCode"
                            value={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="country"
                            value={country}
                            label="Country"
                            type="text"
                            onChange={e => setCountry(e.target.value)}
                        />
                        <div>
                            <Button disabled >Back</Button>
                            <Button className={classes.submit} onClick={handleNext} variant="contained" >
                                Next
                            </Button>
                        </div>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Shipping;

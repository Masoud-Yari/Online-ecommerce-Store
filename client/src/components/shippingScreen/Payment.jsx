import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addPayment} from '../../actions/cartAction';
import {
    Container,
    Button,
    Typography,
    CssBaseline,
    Radio,
    FormControlLabel,
    Paper
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30
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

const Payment = ({next, back}) => {
    const classes = useStyle();

    const [payment, setPayment] = useState('');

    const dispatch = useDispatch();
    const handleNext = () => {
        if(payment) {
            dispatch(addPayment(payment));
            next();
        }
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper elevation={12} className={classes.paper}>
                    <Typography component="h1" variant="h5">
                    Payment
                    </Typography>
                    <FormControlLabel
                        value="paypal" 
                        control={<Radio />} 
                        label="Paypal" 
                        onChange={e => setPayment(e.target.value)} 
                    />
                    <div>
                        <Button onClick={back}>Back</Button>
                        <Button className={classes.submit} onClick={handleNext} variant="contained">
                            Next
                        </Button>
                    </div>
                </Paper>
            </Container>
        </>
    )
}

export default Payment;

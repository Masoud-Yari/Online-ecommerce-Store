import React, { useState } from 'react';
import { Stepper, Step, StepLabel} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Shipping from './Shipping';
import Payment from './Payment';
import PlaceOrder from './PlaceOrder';

const useStyle = makeStyles(() => ({
    stepper: {
        maxWidth: 700, 
        width: '100%', 
        margin: '50px auto', 
        backgroundColor: '#f1f1f1'
    }
}))

// Generates array of steps Label
const getSteps = () => {
    return [
        'Sign-In', 
        'Shipping', 
        'Payment', 
        'Place Order'
    ]
}

const ShippingSteps = () => {

    const classes = useStyle();

    const [activeStep, setActiveStep] = useState(1);

    // Get steps label
    const steps = getSteps();

    const next = () => {
        if(activeStep < steps.length - 1){
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    }

    const back = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    // For any steps show the given component
    function getStepContent(step) {
        switch (step) {
          case 1:
            return <Shipping next={next}/>;
          case 2:
            return <Payment next={next} back={back}/>;
          case 3:
            return <PlaceOrder back={back} />;
          default:
            return 'Unknown step';
        }
      }

    return (
        <div>
            <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel >{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {<div>
                {getStepContent(activeStep)}
            </div>}
        </div>
    )
}

export default ShippingSteps;

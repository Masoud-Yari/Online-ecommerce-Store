import axios from 'axios';
import {USER_SIGNIN_REQUEST, 
        USER_SIGNIN_SUCCESS, 
        USER_SIGNIN_FAILURE, 
        USER_REGISTER_REQUEST,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_FAILURE 
    } from '../constants/usersConstant';
import Cookie from 'js-cookie';

export const signIn = (email, password) => async dispatch => {
    
    try {
        dispatch({type: USER_SIGNIN_REQUEST});
        const {data} = await axios.post('/api/users/signin', {
        email, 
        password
    });
        
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        Cookie.set('userData', JSON.stringify(data));
        
    } catch (error) {
        dispatch({type: USER_SIGNIN_FAILURE, payload: error.message});
    }

}

export const register = (name, email, password, rePassword) => async dispatch => {
    
    try {
        dispatch({type: USER_REGISTER_REQUEST});
        const {data} = await axios.post('/api/users/register', {
        name,
        email, 
        password,
        rePassword
    });
        if(data.user) {
            dispatch({type: USER_REGISTER_SUCCESS, payload: data.user});
            Cookie.set('userData', JSON.stringify(data.user));
        }else if(data.msg) {
            dispatch({type: USER_REGISTER_FAILURE, payload: data.msg});
        }
    } catch (error) {
        dispatch({type: USER_REGISTER_FAILURE, payload: error.message});
    }

}
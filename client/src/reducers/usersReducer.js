import {USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_SIGNIN_FAILURE, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE 
} from '../constants/usersConstant';

export const signInReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_SIGNIN_REQUEST: 
            return {loading: true};
        case USER_SIGNIN_SUCCESS: 
            return {loading: false, userData: action.payload};
        case USER_SIGNIN_FAILURE: 
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const registerReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST: 
            return {loading: true};
        case USER_REGISTER_SUCCESS: 
            return {loading: false, userData: action.payload};
        case USER_REGISTER_FAILURE: 
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}
import axios from 'axios';
import Cookie from 'js-cookie';
import {ADD_TO_CART, REMOVE_FROM_CART, CART_ADD_SHIPPING, CART_ADD_PAYMENT} from '../constants/cartConstant';

export const addItemToCart = (productId, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${productId}`);
    dispatch({
        type: ADD_TO_CART, 
        payload: {
            id: data._id, 
            name: data.name, 
            price: data.price, 
            image: data.image, 
            numberOfProduct: data.numberOfProduct, 
            qty
        }
    });
    const {cart: {cartItems}} = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
}

export const removeItemFromCart = (productId) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART, 
        payload: productId
    });
    const {cart: {cartItems}} = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
}

export const addShipping = (data) => dispatch => {
    dispatch({
        type: CART_ADD_SHIPPING, 
        payload: data
    });
}

export const addPayment = (data) => dispatch => {
    dispatch({
        type: CART_ADD_PAYMENT,
        payload: data
    });
}
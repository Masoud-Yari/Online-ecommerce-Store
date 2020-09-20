import {ADD_TO_CART, REMOVE_FROM_CART, CART_ADD_SHIPPING, CART_ADD_PAYMENT} from '../constants/cartConstant';

export const cartReducer = (state = {cartItems: []}, action) => {
    switch(action.type) {
        case ADD_TO_CART: 
            const item = action.payload;
            const existedProduct = state.cartItems.find(cartItem => cartItem.id === item.id);
            if(existedProduct)
                return {cartItems: state.cartItems.map(cartItem => cartItem.id === item.id ? item : cartItem) };
            else    
                return { cartItems: [...state.cartItems, item]};
        case REMOVE_FROM_CART: 
            return { cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload)};
        case CART_ADD_SHIPPING:
            return {...state, shipping: action.payload};
        case CART_ADD_PAYMENT:
            return {...state, payment: action.payload};
        default:
            return state;
    }
}
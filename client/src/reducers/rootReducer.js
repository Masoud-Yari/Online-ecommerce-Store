import {combineReducers} from 'redux';
import {productsListReducer, productDetailsReducer, productAddReducer, productDeleteReducer} from './productsReducer';
import {cartReducer} from './cartReducer';
import {signInReducer, registerReducer} from './usersReducer';

const rootReducer = combineReducers({
    productsList: productsListReducer, 
    productDetails: productDetailsReducer, 
    cart: cartReducer, 
    signInUser: signInReducer, 
    registerUser: registerReducer,
    addProduct: productAddReducer,
    deleteProduct: productDeleteReducer
});

export default rootReducer;
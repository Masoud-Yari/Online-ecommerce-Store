import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import rootReducer from './reducers/rootReducer';

const cartItems = Cookie.getJSON('cartItems') || [];
const userData = Cookie.getJSON('userData') || null;

const initialStore = {
    cart: {cartItems, shipping: {}, payment: {}}, 
    signInUser: {userData}
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialStore, composeEnhancers(applyMiddleware(thunk)));

export default store;
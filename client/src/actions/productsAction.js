import axios from 'axios';
import {
    PRODUCTS_LIST_REQUEST, 
    PRODUCTS_LIST_SUCCESS, 
    PRODUCTS_LIST_FAILURE,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE,
    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAILURE,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAILURE
} from '../constants/productsConstant';

export const getProducts = () => async dispatch => {
    try {
        dispatch({type: PRODUCTS_LIST_REQUEST});
        const {data} = await axios.get('/api/products');
        dispatch({type: PRODUCTS_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCTS_LIST_FAILURE, payload: error.message});
    }
}


export const getProductDetails = (productId) => async dispatch => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/products/${productId}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAILURE, payload: error.message});
    }
}

export const addProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_ADD_REQUEST});
        const {signInUser: {userData}} = getState();
        if(!product.id) {
            const {data} = await axios.post(`/api/products`, product, {
                headers: {
                    "authorization": `loream ${userData.token}`
                }
            });
            dispatch({type: PRODUCT_ADD_SUCCESS, payload: data});
        }else {
            const {data} = await axios.put(`/api/products/${product.id}`, product, {
                headers: {
                    "authorization": `loream ${userData.token}`
                }
            });
            dispatch({type: PRODUCT_ADD_SUCCESS, payload: data});
        }
    } catch (error) {
        dispatch({type: PRODUCT_ADD_FAILURE, payload: error.message});
    }
}

export const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_DELETE_REQUEST});
        const {signInUser: {userData}} = getState();
        const {data} = await axios.delete(`/api/products/${productId}`, {
            headers: {
                "authorization": `loream ${userData.token}`
            }
        });
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_DELETE_FAILURE, payload: error.message});
    }
}
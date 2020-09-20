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

export const productsListReducer = (state = {products: []}, action) => {
    switch(action.type) {
        case PRODUCTS_LIST_REQUEST: 
            return { loading: true};
        case PRODUCTS_LIST_SUCCESS: 
            return { loading: false, products: action.payload};
        case PRODUCTS_LIST_FAILURE: 
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}

export const productDetailsReducer = (state = {productDetails: {}}, action) => {
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST: 
            return { loading: true};
        case PRODUCT_DETAILS_SUCCESS: 
            return { loading: false, productDetails: action.payload};
        case PRODUCT_DETAILS_FAILURE: 
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}

export const productAddReducer = (state = {products: []}, action) => {
    switch(action.type) {
        case PRODUCT_ADD_REQUEST: 
            return { loading: true, success: false};
        case PRODUCT_ADD_SUCCESS: 
            return { loading: false, success: true, products: action.payload};
        case PRODUCT_ADD_FAILURE: 
            return { loading: false, success: false, error: action.payload};
        default:
            return state;
    }
}

export const productDeleteReducer = (state = {feedback: {}}, action) => {
    switch(action.type) {
        case PRODUCT_DELETE_REQUEST: 
            return { loading: true, success: false};
        case PRODUCT_DELETE_SUCCESS: 
            return { loading: false,seccess: true, message: action.payload};
        case PRODUCT_DELETE_FAILURE: 
            return { loading: false, success: false, error: action.payload};
        default:
            return state;
    }
}
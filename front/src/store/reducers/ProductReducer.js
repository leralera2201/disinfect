import {
    ERROR_FILTERS, ERROR_PRODUCT,
    ERROR_PRODUCTS,
    GET_FILTERS, GET_PRODUCT_BY_ID,
    GET_PRODUCTS,
    SET_FILTERS, SET_PRODUCT,
    SET_PRODUCTS
} from "../actions/productActions";

const initialState = {
    products: [],
    error: null,
    loading: false,
}

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {...state, loading: true, error: null}
        case SET_PRODUCTS:
            return {...state, loading: false, products: action.payload}
        case ERROR_PRODUCTS:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}

const initialStateFilter = {
    error: null,
    loading: false,
    countries: [],
    minPrice: 0,
    maxPrice: 1000
}

export const FilterReducer = (state = initialStateFilter, action) => {
    switch (action.type) {
        case GET_FILTERS:
            return {...state, loading: true, error: null}
        case SET_FILTERS:
            const {countries, minPrice, maxPrice} = action.payload
            return {...state, loading: false,  countries, minPrice, maxPrice}
        case ERROR_FILTERS:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}

const productDetailInitialState = {
    product: null,
    error: null,
    loading: false
}

export const ProductDetailReducer = (state = productDetailInitialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_BY_ID:
            return {...state, loading: true, error: null}
        case SET_PRODUCT:
            return {...state, loading: false,  product: action.payload}
        case ERROR_PRODUCT:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }

}

import {ProductAction, ProductPayloadFromServerInterface, ProductTypes} from "../actions/product.action";


export interface InitState {
    items: ProductPayloadFromServerInterface,
    error: null | string,
    loading: boolean,
    firstLoading: boolean
}

const initState = {
    items: {products: [], count: 0},
    error: null,
    loading: true,
    firstLoading: true
}

export const ProductReducer = (state: InitState = initState, action: ProductAction) => {
    switch (action.type) {
        case ProductTypes.PRODUCT_REQUEST:
        case ProductTypes.ADD_PRODUCT_REQUEST:
        case ProductTypes.DELETE_PRODUCT_REQUEST:
            return {...state, loading: true, error: null}
        case ProductTypes.PRODUCT_SUCCESS:
            return {...state, items: action.payload, loading: false, firstLoading: false}
        case ProductTypes.PRODUCT_ERROR:
            return {...state, loading: false, error: action.payload.message}
        default:
            return state
    }
}

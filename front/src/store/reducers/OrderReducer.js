import {CREATE_ORDER_ERROR, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} from "../actions/orderActions";

const initialState = {
    loading: false,
    success: false,
    error: null
}

export const OrderReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_ORDER_REQUEST:
            return {...state, error: null, loading: true}
        case CREATE_ORDER_SUCCESS:
            return {...state, success: true, loading: false}
        case CREATE_ORDER_ERROR:
            return {...state, success: false, loading: false, error: action.payload}
        default:
            return state
    }
}

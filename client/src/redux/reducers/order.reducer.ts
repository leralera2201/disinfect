import {OrderAction, OrderPayloadFromServerInterface, OrderTypes} from "../actions/order.action";


export interface InitState {
    items: OrderPayloadFromServerInterface,
    error: null | string,
    loading: boolean,
    firstLoading: boolean
}

const initState = {
    items: {orders: [], count: 0},
    error: null,
    loading: true,
    firstLoading: true
}

export const OrderReducer = (state: InitState = initState, action: OrderAction) => {
    switch (action.type) {
        case OrderTypes.ORDER_REQUEST:
        case OrderTypes.ADD_ORDER_REQUEST:
        case OrderTypes.DELETE_ORDER_REQUEST:
            return {...state, loading: true, error: null}
        case OrderTypes.ORDER_SUCCESS:
            return {...state, items: action.payload, loading: false, firstLoading: false}
        case OrderTypes.ORDER_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}

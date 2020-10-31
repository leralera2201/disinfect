import {ADD_TO_CART, REMOVE_ALL, REMOVE_FROM_CART} from "../actions/cartActions";
import {CREATE_ORDER_SUCCESS} from "../actions/orderActions";

export const CartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const {product, qty} = action.payload;
            const foundProduct = state.find(x => x.product._id === product._id);
            if (foundProduct) {
                return state.map(x => x.product._id === product._id ? {...foundProduct, qty} : x)
            }
            return [...state, {product, qty}];
        case REMOVE_FROM_CART:
            return state.filter(el => el.product._id !== action.payload)
        case REMOVE_ALL:
            return []
        case CREATE_ORDER_SUCCESS:
            return []
        default:
            return state
    }
}

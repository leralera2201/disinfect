import {createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {AlertReducer} from "./reducers/AlertReducer";
import {CategoryReducer} from "./reducers/CategoryReducer";
import {FilterReducer, ProductDetailReducer, ProductReducer} from "./reducers/ProductReducer";
import {CartReducer} from "./reducers/CartReducer";
import {OrderReducer} from "./reducers/OrderReducer";

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
const initialStore = {
    cartItems
}

const rootReducer = combineReducers({
    alert: AlertReducer,
    categories: CategoryReducer,
    products: ProductReducer,
    filters: FilterReducer,
    productDetail: ProductDetailReducer,
    cartItems: CartReducer,
    order: OrderReducer
})


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, initialStore, composeEnhancer(applyMiddleware(thunk)))

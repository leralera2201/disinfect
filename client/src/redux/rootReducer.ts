import {combineReducers} from 'redux'
import {AuthReducer} from "./reducers/auth.reducer";
import {AlertReducer} from "./reducers/alert.reducer";
import {CategoryReducer} from "./reducers/category.reducer";
import {ProductReducer} from "./reducers/product.reducer";
import {OrderReducer} from "./reducers/order.reducer";

export const rootReducer = combineReducers({
    auth: AuthReducer,
    alert: AlertReducer,
    categories: CategoryReducer,
    products: ProductReducer,
    orders: OrderReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>

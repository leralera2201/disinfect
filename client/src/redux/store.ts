import {applyMiddleware, compose, createStore} from 'redux'
import {rootReducer} from "./rootReducer";
import createSagaMiddleware from 'redux-saga'
import {allSagas} from './sagas'


const sagaMiddleware = createSagaMiddleware()

const token = JSON.parse(localStorage.getItem('token') as string) || null
const initialState = {
   auth: {token, loading: false, error: null}
}

declare global{
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(allSagas)

export default store

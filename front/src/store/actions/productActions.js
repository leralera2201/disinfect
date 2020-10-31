import {axios} from '../../api'
import {setAlert} from "./alertActions";
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const SET_PRODUCTS = 'SET_PRODUCTS'
export const ERROR_PRODUCTS = 'ERROR_PRODUCTS'

export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'
export const SET_PRODUCT = 'SET_PRODUCT'
export const ERROR_PRODUCT = 'ERROR_PRODUCT'

export const GET_FILTERS = 'GET_FILTERS'
export const SET_FILTERS = 'SET_FILTERS'
export const ERROR_FILTERS = 'ERROR_FILTERS'

export const getProducts = (search, categories = '', countries = '', sortOrder = '', minPrice = '', maxPrice = '') => async dispatch => {
    try{
        dispatch({type: GET_PRODUCTS})
        const {data} = await axios.post('/api/products/get', {
            categories, countries, sortOrder, minPrice, maxPrice, search
            }
           )
        dispatch({type: SET_PRODUCTS, payload: data})
    }catch (e) {
        if(e.response){
            dispatch(setAlert(e.response.data.message, 'error'))
            dispatch({type: ERROR_PRODUCTS, payload: e.response.data.message})
        }else{
            dispatch(setAlert('Щось пішло не так','error'))
            dispatch({type: ERROR_PRODUCTS, payload: 'Щось пішло не так'})
        }
    }
}

export const getProductById = (productId) => async dispatch => {
    try{
        dispatch({type: GET_PRODUCT_BY_ID})
        const {data} = await axios.get('/api/products/' + productId)
        dispatch({type: SET_PRODUCT, payload: data})
    }catch (e) {
        if(e.response){
            dispatch(setAlert(e.response.data.message, 'error'))
            dispatch({type: ERROR_PRODUCT, payload: e.response.data.message})
        }else{
            dispatch(setAlert('Щось пішло не так','error'))
            dispatch({type: ERROR_PRODUCT, payload: 'Щось пішло не так'})
        }
    }
}

export const getFilters = () => async (dispatch) => {
    try{
        dispatch({type: GET_FILTERS})
        const {data} = await axios.get('/api/products/filters')
        dispatch({type: SET_FILTERS, payload: data})
    }catch (e) {
        if(e.response){
            dispatch(setAlert(e.response.data.message, 'error'))
            dispatch({type: ERROR_FILTERS, payload: e.response.data.message})
        }else{
            dispatch(setAlert('Щось пішло не так','error'))
            dispatch({type: ERROR_FILTERS, payload: 'Щось пішло не так'})
        }
    }
}

import {setAlert} from "./alertActions";
import {axios} from './../../api'
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST'
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS'
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR'

export const createOrder =  (order) => async dispatch => {
    try{
        dispatch({type: CREATE_ORDER_REQUEST})
        await axios.post('/api/orders', order)
        dispatch({type: CREATE_ORDER_SUCCESS})
        dispatch(setAlert('Ваше замовлення прийнято! Очікуйте дзвінка.','success'))
    }catch (e) {
        if(e.response){
            dispatch(setAlert(e.response.data.message, 'error'))
            dispatch({type: CREATE_ORDER_ERROR, payload: e.response.data.message})
        }else{
            dispatch(setAlert('Щось пішло не так','error'))
            dispatch({type: CREATE_ORDER_ERROR, payload: 'Щось пішло не так'})
        }
    }
}

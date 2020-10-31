import {setAlert} from "./alertActions";
import {axios} from '../../api'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const ERROR_CATEGORIES = 'ERROR_CATEGORIES'


export const getCategories = () => async dispatch => {
    try{
        dispatch({type: GET_CATEGORIES})
        const {data} = await axios.get('/api/categories')
        dispatch({type: SET_CATEGORIES, payload: data})
    }catch (e) {
        if(e.response){
            dispatch(setAlert(e.response.data.message, 'error'))
            dispatch({type: ERROR_CATEGORIES, payload: e.response.data.message})
        }else{
            dispatch(setAlert('Щось пішло не так','error'))
            dispatch({type: ERROR_CATEGORIES, payload: 'Щось пішло не так'})
        }

    }
}

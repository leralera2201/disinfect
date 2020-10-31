import {v4 as uuidv4} from 'uuid'

export const SETALERT = 'SETALERT'
export const CLEARALERT = 'CLEARALERT'

export const setAlert = (msg, type) => dispatch => {
    const id = uuidv4()
    dispatch({
        type: SETALERT,
        payload: {msg, type, id}
    })
    setTimeout(() => {
        dispatch({type: CLEARALERT, payload: id})
    }, 3000)
}

import {CLEARALERT, SETALERT} from "../actions/alertActions";

export const AlertReducer = (state = [], action) => {
    switch (action.type) {
        case SETALERT:
            return [...state, action.payload]
        case CLEARALERT:
            return state.filter(el => el.id !== action.payload)
        default:
            return state
    }
}

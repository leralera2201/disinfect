import {ERROR_CATEGORIES, GET_CATEGORIES, SET_CATEGORIES} from "../actions/categoryActions";

const initialState = {
    loading: false, error: null, categories: []
}

export const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {...state, loading: true, error: null}
        case SET_CATEGORIES:
            return {...state, loading: false, categories: action.payload}
        case ERROR_CATEGORIES:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}

import {ActionTypes, AuthTypes} from "../actions/auth.actions";

export interface InitState {
    loading: boolean,
    token: null | string,
    error: null | string
}

const initState: InitState = {
    loading: false,
    token: null,
    error: null
}

export const AuthReducer = (state = initState, action: ActionTypes) => {
    switch (action.type) {
        case AuthTypes.SIGNIN_REQUEST:
            return {...state, loading: true, error: null}
        case AuthTypes.SIGNIN:
            return {...state, loading: false, token: action.payload.token}
        case AuthTypes.SIGNIN_ERROR:
            return {...state, loading: false, error: action.payload}
        case AuthTypes.LOGOUT:
            return initState
        default:
            return state
    }
}

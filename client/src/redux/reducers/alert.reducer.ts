import {AlertAction, AlertTypes} from "../actions/alert.action";

interface InitState {
    id: string,
    msg: string,
    type: string
}

export const AlertReducer = (state: InitState[] = [], action: AlertAction) => {
    switch (action.type) {
        case AlertTypes.SETALERT:
            return [...state, action.payload]
        case AlertTypes.REMOVEALERT:
            return state.filter(alert => alert.id !== action.payload.id)
        default:
            return state
    }
}

import {v4 as uuidv4} from 'uuid'

export enum AlertTypes {
    SETALERT = 'SETALERT',
    REMOVEALERT = 'REMOVEALERT'
}

export interface SetAlertPayloadWithIdInterface {
    msg: string,
    type: string,
    id: string
}

export interface SetAlertPayloadInterface {
    msg: string,
    type: string
}

export interface SetAlertInterface {
    type: AlertTypes.SETALERT,
    payload: SetAlertPayloadWithIdInterface
}

export interface RemoveAlertPayloadInterface {
    id: string
}

export interface RemoveAlertInterface {
    type: AlertTypes.REMOVEALERT,
    payload: RemoveAlertPayloadInterface
}

export const setAlert = (payload: SetAlertPayloadInterface): SetAlertInterface => {
    const id = uuidv4()
    return {
        type: AlertTypes.SETALERT,
        payload: {...payload, id}
    }
}

export const removeAlert = (payload: RemoveAlertPayloadInterface): RemoveAlertInterface => {
    return {
        type: AlertTypes.REMOVEALERT,
        payload
    }
}

export type AlertAction = SetAlertInterface | RemoveAlertInterface

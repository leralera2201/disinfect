import {takeLatest, put, call} from 'redux-saga/effects'
import {AlertTypes, removeAlert, SetAlertInterface} from "../actions/alert.action";


const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time));

function* alertWorker({payload}: SetAlertInterface) {
    yield call(delay, 3000)
    yield put(removeAlert({id: payload.id}))
}

export function* alertWatcher() {
    yield takeLatest(AlertTypes.SETALERT, alertWorker)
}

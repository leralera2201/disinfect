import {takeLatest, call, put} from 'redux-saga/effects'
import {
    AuthTypes,
    SignInRequestActionInterface,
    SignInSuccessInterface,
    setError,
    signIn, SignInRequestInterface
} from "../actions/auth.actions";
import {axiosInstance as axios} from './../../axios-config/index'
import {setAlert} from "../actions/alert.action";

function signInRequest(user: SignInRequestInterface): Promise<SignInSuccessInterface> {
    return axios.post('/api/auth/signin', user).then(({data}) => data)
}

function* authWorker({payload}: SignInRequestActionInterface) {
    try{
        const data = yield call(signInRequest, payload)
        console.log(data)
        localStorage.setItem('token', JSON.stringify(data.token))
        yield put(signIn(data))
    }catch (e) {
        if(e.response){
            console.log(e.response.data)
            yield put(setError(e.response.data.message))
            yield put(setAlert({msg: e.response.data.message, type: 'danger'}))
        }else{
            yield put(setError('Something went wrong. Try again'))
            yield put(setAlert({msg: 'Something went wrong. Try again', type: 'danger'}))
        }
    }
}

export function* authWatcher() {
    yield takeLatest(AuthTypes.SIGNIN_REQUEST, authWorker)
}

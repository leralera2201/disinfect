import {takeLatest, call, put} from 'redux-saga/effects'
import {axiosInstance as axios} from './../../axios-config/index'
import {setAlert} from "../actions/alert.action";
import {
    AddOrderRequest, DeleteOrderRequest,
    OrderInterface,
    OrderPayloadFromServerInterface,
    OrderRequestInterface, OrderTypes,
    setOrders,
    setOrdersError
} from "../actions/order.action";

const token = JSON.parse(localStorage.getItem('token') as string)

function ordersRequest(page: number, per_page: number, sort_order: string): Promise<OrderPayloadFromServerInterface> {
    return axios.get('/api/orders/all?page=' +
        page + '&per_page=' + per_page + '&sort_order=' + sort_order).then(({data}) => data)
}

function* ordersWorker({payload}: OrderRequestInterface) {
    try{
        const data = yield call(ordersRequest, payload.page, payload.per_page, payload.sortOrder)
        yield put(setOrders(data))
    }catch (e) {
        if(e.response){
            console.log(e.response.data)
            yield put(setOrdersError(e.response.data.message))
            yield put(setAlert({msg: e.response.data.message, type: 'danger'}))
        }else{
            yield put(setOrdersError('Something went wrong. Try again'))
            yield put(setAlert({msg: 'Something went wrong. Try again', type: 'danger'}))
        }
    }
}

function addOrderRequest(api: string, order: OrderInterface){
    let req;
    if(api === 'POST'){
        req = axios.post('/api/orders', order)
    }else{
        req = axios.put('/api/orders/' + order._id, order)
    }
    return req.then(({data}) => data)
}
function* addOrderWorker({payload}: AddOrderRequest) {
    try{
        const data = yield call(addOrderRequest, payload.api, payload.order)
        if(data.success){
            if(payload.api === 'POST'){
                yield put(setAlert({msg: 'Замовлення додане', type: 'success'}))
            }else{
                yield put(setAlert({msg: 'Замовлення оновлене', type: 'success'}))
            }
        }

    }catch (e) {
        if(e.response){
            console.log(e.response.data)
            yield put(setOrdersError(e.response.data.message))
            yield put(setAlert({msg: e.response.data.message, type: 'danger'}))
        }else{
            yield put(setOrdersError('Something went wrong. Try again'))
            yield put(setAlert({msg: 'Something went wrong. Try again', type: 'danger'}))
        }
    }
}

function deleteOrderRequest(id: string){
    return axios.delete('/api/orders/' + id).then(({data}) => data)
}

function* deleteOrderWorker({payload}: DeleteOrderRequest) {
    try{
        const data = yield call(deleteOrderRequest, payload)
        if(data.success){
            yield put(setAlert({msg: 'Замовлення видалене', type: 'success'}))
        }

    }catch (e) {
        if(e.response){
            console.log(e.response.data)
            yield put(setOrdersError(e.response.data.message))
            yield put(setAlert({msg: e.response.data.message, type: 'danger'}))
        }else{
            yield put(setOrdersError('Something went wrong. Try again'))
            yield put(setAlert({msg: 'Something went wrong. Try again', type: 'danger'}))
        }
    }
}

export function* ordersWatcher() {
    yield takeLatest(OrderTypes.ORDER_REQUEST, ordersWorker)
    yield takeLatest(OrderTypes.ADD_ORDER_REQUEST, addOrderWorker)
    yield takeLatest(OrderTypes.DELETE_ORDER_REQUEST, deleteOrderWorker)
}

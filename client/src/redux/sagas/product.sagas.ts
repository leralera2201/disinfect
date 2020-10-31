import {takeLatest, call, put} from 'redux-saga/effects'
import {axiosInstance as axios} from './../../axios-config/index'
import {setAlert} from "../actions/alert.action";
import {
    AddProductRequest, DeleteProductRequest,
    ProductPayloadFromServerInterface, ProductPayloadInterface,
    ProductRequestInterface, ProductTypes,
    setProducts,
    setProductsError
} from "../actions/product.action";

const token = JSON.parse(localStorage.getItem('token') as string)

function productsRequest(page: number, per_page: number, sort_order: string): Promise<ProductPayloadFromServerInterface> {
    return axios.get('/api/products/all?page=' +
        page + '&per_page=' + per_page + '&sort_order=' + sort_order
    ).then(({data}) => data)
}

function* productsWorker({payload}: ProductRequestInterface) {
    try{
        const data = yield call(productsRequest, payload.page, payload.per_page, payload.sortOrder)
        yield put(setProducts(data))
    }catch (e) {
        if(e.response){
            console.log(e.response.data)
            yield put(setProductsError({message: e.response.data.message}))
            yield put(setAlert({msg: e.response.data.message, type: 'danger'}))
        }else{
            yield put(setProductsError({message: 'Something went wrong. Try again'}))
            yield put(setAlert({msg: 'Something went wrong. Try again', type: 'danger'}))
        }
    }
}

function addProductRequest(api: string, product: ProductPayloadInterface){
    let req;
    if(api === 'POST'){
        req = axios.post('/api/products', product)
    }else{
        req = axios.put('/api/products/' + product._id, product)
    }
    return req.then(({data}) => data)
}
function* addProductWorker({payload}: AddProductRequest) {
    try{
        const data = yield call(addProductRequest, payload.api, payload.product)
        if(data.success){
            if(payload.api === 'POST'){
                yield put(setAlert({msg: 'Товар доданий', type: 'success'}))
            }else{
                yield put(setAlert({msg: 'Товар оновлений', type: 'success'}))
            }
        }

    }catch (e) {
        if(e.response){
            console.log(e.response.data)
            yield put(setProductsError({message: e.response.data.message}))
            yield put(setAlert({msg: e.response.data.message, type: 'danger'}))
        }else{
            yield put(setProductsError({message: 'Something went wrong. Try again'}))
            yield put(setAlert({msg: 'Something went wrong. Try again', type: 'danger'}))
        }
    }
}

function deleteProductRequest(id: string){
    return axios.delete('/api/products/' + id).then(({data}) => data)
}

function* deleteProductWorker({payload}: DeleteProductRequest) {
    try{
        const data = yield call(deleteProductRequest, payload)
        if(data.success){
            yield put(setAlert({msg: 'Товар видалений', type: 'success'}))
        }

    }catch (e) {
        if(e.response){
            console.log(e.response.data)
            yield put(setProductsError({message: e.response.data.message}))
            yield put(setAlert({msg: e.response.data.message, type: 'danger'}))
        }else{
            yield put(setProductsError({message: 'Something went wrong. Try again'}))
            yield put(setAlert({msg: 'Something went wrong. Try again', type: 'danger'}))
        }
    }
}

export function* productsWatcher() {
    yield takeLatest(ProductTypes.PRODUCT_REQUEST, productsWorker)
    yield takeLatest(ProductTypes.ADD_PRODUCT_REQUEST, addProductWorker)
    yield takeLatest(ProductTypes.DELETE_PRODUCT_REQUEST, deleteProductWorker)
}

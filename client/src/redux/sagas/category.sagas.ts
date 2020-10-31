import {takeLatest, call, put} from 'redux-saga/effects'
import {axiosInstance as axios} from './../../axios-config/index'
import {setAlert} from "../actions/alert.action";
import {
    AddCategoryRequest,
    CategoryPayloadFromServerInterface, CategoryPayloadInterface, CategoryRequestInterface,
    CategoryTypes, DeleteCategoryRequest,
    setCategories,
    setCategoriesError
} from "../actions/category.action";

const token = JSON.parse(localStorage.getItem('token') as string)

function categoriesRequest(page: number, per_page: number, sort_order: string): Promise<CategoryPayloadFromServerInterface> {
    return axios.get('/api/categories/all?page=' +
        page + '&per_page=' + per_page + '&sort_order=' + sort_order).then(({data}) => data)
}

function* categoriesWorker({payload}: CategoryRequestInterface) {
    try{
        const data = yield call(categoriesRequest, payload.page, payload.per_page, payload.sortOrder)
        yield put(setCategories(data))
    }catch (e) {
        if(e.response){
            console.log(e.response.data)
            yield put(setCategoriesError({message: e.response.data.message}))
            yield put(setAlert({msg: e.response.data.message, type: 'danger'}))
        }else{
            yield put(setCategoriesError({message: 'Something went wrong. Try again'}))
            yield put(setAlert({msg: 'Something went wrong. Try again', type: 'danger'}))
        }
    }
}

function addCategoryRequest(api: string, category: CategoryPayloadInterface){
    let req;
    if(api === 'POST'){
        req = axios.post('/api/categories', category)
    }else{
        req = axios.put('/api/categories/' + category._id, category)
    }
    return req.then(({data}) => data)
}
function* addCategoryWorker({payload}: AddCategoryRequest) {
    try{
        const data = yield call(addCategoryRequest, payload.api, payload.category)
        if(data.success){
            if(payload.api === 'POST'){
                yield put(setAlert({msg: 'Категорія Додана', type: 'success'}))
            }else{
                yield put(setAlert({msg: 'Категорія оновлена', type: 'success'}))
            }
        }

    }catch (e) {
        if(e.response){
            console.log(e.response.data)
            yield put(setCategoriesError({message: e.response.data.message}))
            yield put(setAlert({msg: e.response.data.message, type: 'danger'}))
        }else{
            yield put(setCategoriesError({message: 'Something went wrong. Try again'}))
            yield put(setAlert({msg: 'Something went wrong. Try again', type: 'danger'}))
        }
    }
}

function deleteCategoryRequest(id: string){
    return axios.delete('/api/categories/' + id).then(({data}) => data)
}

function* deleteCategoryWorker({payload}: DeleteCategoryRequest) {
    try{
        const data = yield call(deleteCategoryRequest, payload)
        if(data.success){
            yield put(setAlert({msg: 'Категорія видалена', type: 'success'}))
        }

    }catch (e) {
        if(e.response){
            console.log(e.response.data)
            yield put(setCategoriesError({message: e.response.data.message}))
            yield put(setAlert({msg: e.response.data.message, type: 'danger'}))
        }else{
            yield put(setCategoriesError({message: 'Something went wrong. Try again'}))
            yield put(setAlert({msg: 'Something went wrong. Try again', type: 'danger'}))
        }
    }
}

export function* categoriesWatcher() {
    yield takeLatest(CategoryTypes.CATEGORY_REQUEST, categoriesWorker)
    yield takeLatest(CategoryTypes.ADD_CATEGORY_REQUEST, addCategoryWorker)
    yield takeLatest(CategoryTypes.DELETE_CATEGORY_REQUEST, deleteCategoryWorker)
}

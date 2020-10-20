import {CategoriesAction, CategoryPayloadFromServerInterface, CategoryTypes} from "../actions/category.action";


export interface InitState {
    items: CategoryPayloadFromServerInterface,
    error: null | string,
    loading: boolean,
    firstLoading: boolean
}

const initState = {
    items: {categories: [], count: 0},
    error: null,
    loading: true,
    firstLoading: true
}

export const CategoryReducer = (state: InitState = initState, action: CategoriesAction) => {
    switch (action.type) {
        case CategoryTypes.CATEGORY_REQUEST:
        case CategoryTypes.ADD_CATEGORY_REQUEST:
        case CategoryTypes.DELETE_CATEGORY_REQUEST:
            return {...state, loading: true, error: null}
        case CategoryTypes.CATEGORY_SUCCESS:
            return {...state, items: action.payload, loading: false, firstLoading: false}
        case CategoryTypes.CATEGORY_ERROR:
            return {...state, loading: false, error: action.payload.message}
        default:
            return state
    }
}

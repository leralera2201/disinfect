export enum CategoryTypes {
    CATEGORY_REQUEST = 'CATEGORY_REQUEST',
    CATEGORY_SUCCESS = 'CATEGORY_SUCCESS',
    CATEGORY_ERROR = 'CATEGORY_ERROR',
    ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST',
    DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST',
}


export interface CategoryPayloadInterface{
    _id?: string,
    title: string,
    description: string,
    isActive: boolean
}

export interface CategoryPayloadWithIdInterface{
    _id: string,
    title: string,
    description: string,
    isActive: boolean
}

export interface CategoryPayloadFromServerInterface{
   categories: CategoryPayloadWithIdInterface[],
    count: number
}
interface CategoryErrorMessageInterface{
   message: string
}
export interface CategoryRequestParamsInterface{
    page: number,
    per_page: number,
    sortOrder: string
}

export interface CategoryRequestInterface{
    type: CategoryTypes.CATEGORY_REQUEST,
    payload: CategoryRequestParamsInterface
}

export interface AddCategoryRequest{
    type: CategoryTypes.ADD_CATEGORY_REQUEST,
    payload: {
        api: string,
        category: CategoryPayloadInterface
    }
}


export interface DeleteCategoryRequest{
    type: CategoryTypes.DELETE_CATEGORY_REQUEST,
    payload: string
}


interface CategorySuccessInterface{
    type: CategoryTypes.CATEGORY_SUCCESS,
    payload: CategoryPayloadFromServerInterface
}

interface CategoryErrorInterface{
    type: CategoryTypes.CATEGORY_ERROR,
    payload: CategoryErrorMessageInterface
}

export const getCategories = (page: number, per_page: number, sortOrder: string) : CategoryRequestInterface => {
    return {type: CategoryTypes.CATEGORY_REQUEST, payload: {page, per_page, sortOrder}}
}

export const setCategories = (payload: CategoryPayloadFromServerInterface) : CategorySuccessInterface => {
    return {type: CategoryTypes.CATEGORY_SUCCESS, payload}
}

export const setCategoriesError = (message: CategoryErrorMessageInterface): CategoryErrorInterface => {
    return {
        type: CategoryTypes.CATEGORY_ERROR,
        payload: message
    }
}

export const addCategory = (api: string, category: CategoryPayloadInterface): AddCategoryRequest => {
    return {
        type: CategoryTypes.ADD_CATEGORY_REQUEST,
        payload: {api, category}
    }
}

export const deleteCategory = (id: string): DeleteCategoryRequest => ({
    type: CategoryTypes.DELETE_CATEGORY_REQUEST,
    payload: id
})



export type CategoriesAction = CategoryErrorInterface | CategoryRequestInterface | CategorySuccessInterface | AddCategoryRequest | DeleteCategoryRequest

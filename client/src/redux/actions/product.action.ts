import {CategoryPayloadWithIdInterface} from "./category.action";

export enum ProductTypes {
    PRODUCT_REQUEST = 'PRODUCT_REQUEST',
    PRODUCT_SUCCESS = 'PRODUCT_SUCCESS',
    PRODUCT_ERROR = 'PRODUCT_ERROR',
    ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST',
    DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST',
}

export interface SizesInterface{
    size: number, product: ProductPayloadInterface
}
export interface Sizes {
    size: number,
    product: string
}
export interface ProductPayloadInterface{
    _id?: string,
    title: string,
    description: string,
    isActive: boolean,
    imageUrl: string,
    method: string,
    composition: string,
    size: number,
    sizes: Sizes[] | [],
    price: number,
    sale: number,
    newPrice: number,
    category: string,
    countOfAvailability: number,
    brand: string,
    country: string,
    isAvailable: boolean
}

export interface ProductPayloadWithIdInterface{
    _id: string,
    title: string,
    description: string,
    isActive: boolean,
    imageUrl: string,
    method: string,
    composition: string,
    size: number,
    sizes: SizesInterface[],
    price: number,
    sale: number,
    newPrice: number,
    category: CategoryPayloadWithIdInterface,
    countOfAvailability: number,
    brand: string,
    country: string,
    isAvailable: boolean
}

export interface ProductPayloadFromServerInterface{
   products: ProductPayloadWithIdInterface[],
    count: number
}
interface ProductErrorMessageInterface{
   message: string
}
export interface ProductRequestParamsInterface{
    page: number,
    per_page: number,
    sortOrder: string
}

export interface ProductRequestInterface{
    type: ProductTypes.PRODUCT_REQUEST,
    payload: ProductRequestParamsInterface
}

export interface AddProductRequest{
    type: ProductTypes.ADD_PRODUCT_REQUEST,
    payload: {
        api: string,
        product: ProductPayloadInterface
    }
}


export interface DeleteProductRequest{
    type: ProductTypes.DELETE_PRODUCT_REQUEST,
    payload: string
}


interface ProductSuccessInterface{
    type: ProductTypes.PRODUCT_SUCCESS,
    payload: ProductPayloadFromServerInterface
}

interface ProductErrorInterface{
    type: ProductTypes.PRODUCT_ERROR,
    payload: ProductErrorMessageInterface
}

export const getProducts = (page: number, per_page: number, sortOrder: string) : ProductRequestInterface => {
    return {type: ProductTypes.PRODUCT_REQUEST, payload: {page, per_page, sortOrder}}
}

export const setProducts = (payload: ProductPayloadFromServerInterface) : ProductSuccessInterface => {
    return {type: ProductTypes.PRODUCT_SUCCESS, payload}
}

export const setProductsError = (message: ProductErrorMessageInterface): ProductErrorInterface => {
    return {
        type: ProductTypes.PRODUCT_ERROR,
        payload: message
    }
}

export const addProduct = (api: string, product: ProductPayloadInterface): AddProductRequest => {
    return {
        type: ProductTypes.ADD_PRODUCT_REQUEST,
        payload: {api, product}
    }
}

export const deleteProduct = (id: string): DeleteProductRequest => ({
    type: ProductTypes.DELETE_PRODUCT_REQUEST,
    payload: id
})



export type ProductAction = ProductErrorInterface | ProductRequestInterface | ProductSuccessInterface | AddProductRequest | DeleteProductRequest

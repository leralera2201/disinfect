import {ProductPayloadWithIdInterface} from "./product.action";

export enum OrderTypes {
    ORDER_REQUEST = 'ORDER_REQUEST',
    ORDER_SUCCESS = 'ORDER_SUCCESS',
    ORDER_ERROR = 'ORDER_ERROR',
    ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST',
    DELETE_ORDER_REQUEST = 'DELETE_ORDER_REQUEST',
}

export interface CartItem {
    product: ProductPayloadWithIdInterface,
    qty: number
}

export interface OrderInterface{
    _id?: string,
    isPaid: boolean,
    isActive: boolean,
    comment: string,
    description: string,
    cartItems: CartItem[],
    totalPrice: number,
    name: string,
    surname: string,
    phone: string,
    createdAt: Date
}

export interface OrderInterfaceWithId{
    _id: string,
    isPaid: boolean,
    isActive: boolean,
    comment: string,
    description: string,
    cartItems: CartItem[],
    totalPrice: number,
    name: string,
    surname: string,
    phone: string,
    createdAt: Date
}


export interface OrderPayloadFromServerInterface{
    orders: OrderInterfaceWithId[],
    count: number
}

export interface OrderRequestParamsInterface{
    page: number,
    per_page: number,
    sortOrder: string
}

export interface OrderRequestInterface{
    type: OrderTypes.ORDER_REQUEST,
    payload: OrderRequestParamsInterface
}

export interface AddOrderRequest{
    type: OrderTypes.ADD_ORDER_REQUEST,
    payload: {
        api: string,
        order: OrderInterface
    }
}


export interface DeleteOrderRequest{
    type: OrderTypes.DELETE_ORDER_REQUEST,
    payload: string
}


interface OrderSuccessInterface{
    type: OrderTypes.ORDER_SUCCESS,
    payload: OrderPayloadFromServerInterface
}

interface OrderErrorInterface{
    type: OrderTypes.ORDER_ERROR,
    payload: string
}

export const getOrders = (page: number, per_page: number, sortOrder: string) : OrderRequestInterface => {
    return {type: OrderTypes.ORDER_REQUEST, payload: {page, per_page, sortOrder}}
}

export const setOrders = (payload: OrderPayloadFromServerInterface) : OrderSuccessInterface => {
    return {type: OrderTypes.ORDER_SUCCESS, payload}
}

export const setOrdersError = (message: string): OrderErrorInterface => {
    return {
        type: OrderTypes.ORDER_ERROR,
        payload: message
    }
}

export const addOrder = (api: string, order: OrderInterface): AddOrderRequest => {
    return {
        type: OrderTypes.ADD_ORDER_REQUEST,
        payload: {api, order}
    }
}

export const deleteOrder = (id: string): DeleteOrderRequest => ({
    type: OrderTypes.DELETE_ORDER_REQUEST,
    payload: id
})



export type OrderAction = OrderErrorInterface | OrderRequestInterface | OrderSuccessInterface | AddOrderRequest | DeleteOrderRequest

export enum AuthTypes {
    SIGNIN='SIGNIN',
    SIGNIN_REQUEST = 'SIGNIN_REQUEST',
    SIGNIN_ERROR = 'SIGNIN_ERROR',
    LOGOUT = 'LOGOUT'
}

export interface SignInRequestInterface {
    email: string,
    password: string
}

export interface SignInSuccessInterface {
    token: string
}

interface ErrorActionInterface {
    type: AuthTypes.SIGNIN_ERROR,
    payload: string
}

export interface SignInRequestActionInterface {
    type: AuthTypes.SIGNIN_REQUEST
    payload: SignInRequestInterface
}

export interface SignInActionInterface {
    type: AuthTypes.SIGNIN
    payload: SignInSuccessInterface
}


export interface LogOutActionInterface {
    type: AuthTypes.LOGOUT
}

export const signInRequest = (user: SignInRequestInterface): SignInRequestActionInterface => ({
    type: AuthTypes.SIGNIN_REQUEST,
    payload: user
})


export const signIn = (user: SignInSuccessInterface): SignInActionInterface => ({
    type: AuthTypes.SIGNIN,
    payload: user
})


export const logOut = (): LogOutActionInterface =>{
    localStorage.removeItem('token')
    return{
        type: AuthTypes.LOGOUT
    }
}


export const setError = (msg: string): ErrorActionInterface => ({
    type: AuthTypes.SIGNIN_ERROR,
    payload: msg
})


export type ActionTypes = SignInActionInterface |
    SignInRequestActionInterface |
    LogOutActionInterface |
    ErrorActionInterface



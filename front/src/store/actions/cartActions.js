export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const REMOVE_ALL = 'REMOVE_ALL'

export const addToCart = (product, qty) => (dispatch, getState) => {
    dispatch({type: ADD_TO_CART, payload: {product, qty}})
    const {cartItems} = getState()
    localStorage.setItem('cartItems', JSON.stringify(cartItems))

}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({type: REMOVE_FROM_CART, payload: id})
    const {cartItems} = getState()
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const removeAllItems = () => dispatch => {
    dispatch({type: REMOVE_ALL})
    localStorage.removeItem('cartItems')
}

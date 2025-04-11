
import { addToCart, initializeCarts, removeFromCarts } from './ActionType'

export const Action = (product) => ({
    type : addToCart,
    payload : product
})

export const removeFromCart = (payload) => ({
    type : removeFromCarts,
    payload
})

export const initializeCart = (product) => ({
    type : initializeCarts,
    payload : product
})


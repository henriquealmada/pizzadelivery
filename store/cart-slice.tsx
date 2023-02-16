import { createSlice } from '@reduxjs/toolkit'
import { CartState } from '../types'

type sliceState = CartState

const initialState: sliceState = {
  items: [],
  quantityItems: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload

      state.items.push(newItem)
      state.quantityItems += newItem.quantity
    },
    clearCart(state) {
      state.items = []
      state.quantityItems = 0
    }
  }
})

export const cartActions = cartSlice.actions

export default cartSlice

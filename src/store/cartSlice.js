import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    ADD_TO_CART: (state, action) => {
      const product = action.payload;

      const productId =
        typeof product._id === 'string'
          ? product._id
          : product._id?.$oid;

      const quantityToAdd = Math.max(
        1,
        Number(product.quantity) || 1
      );

      const existingItem = state.items.find(
        (item) => item.id === productId
      );

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
      } else {
        state.items.push({
          ...product,
          id: productId,
          quantity: quantityToAdd,
        });
      }
    },

    INCREASE_QUANTITY: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    DECREASE_QUANTITY: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    REMOVE_FROM_CART: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  ADD_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_FROM_CART,
} = cartSlice.actions;

export default cartSlice.reducer;

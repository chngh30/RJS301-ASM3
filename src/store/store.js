import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popupSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    popup: popupReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;

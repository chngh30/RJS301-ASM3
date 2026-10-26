import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    isVisible: false,
    product: null,
  },
  reducers: {
    SHOW_POPUP: (state, action) => {
      state.isVisible = true;
      state.product = action.payload;
    },
    HIDE_POPUP: (state) => {
      state.isVisible = false;
      state.product = null;
    },
  },
});

export const { SHOW_POPUP, HIDE_POPUP } = popupSlice.actions;

export default popupSlice.reducer;
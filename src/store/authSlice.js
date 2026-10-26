import { createSlice } from '@reduxjs/toolkit';

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('CURRENT_USER')) || null;
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    currentUser: getCurrentUser(),
  },

  reducers: {
    ON_LOGIN: (state, action) => {
      state.currentUser = action.payload;
    },

    ON_LOGOUT: (state) => {
      state.currentUser = null;
    },
  },
});

export const { ON_LOGIN, ON_LOGOUT } = authSlice.actions;

export default authSlice.reducer;

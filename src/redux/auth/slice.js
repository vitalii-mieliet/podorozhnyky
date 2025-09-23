import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: true,
  user: {
    name: 'Name',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export default authSlice.reducer;

export const authActions = authSlice.actions;

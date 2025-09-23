import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from './operations';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Щось пішло не так';
      });
  },
});

export default userSlice.reducer;

export const authActions = userSlice.actions;

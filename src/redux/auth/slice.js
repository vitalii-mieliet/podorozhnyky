import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, refreshUser } from './operations';
import { fetchCurrentUser } from '../user/operations';

const initialState = {
  isLoading: false,
  isInitialized: false,
  isRefreshing: false,
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // --- Register ---
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // --- Login ---
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // --- Refresh ---
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state) => {
        state.isRefreshing = false;
        state.isInitialized = true;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isInitialized = true;
        state.error = action.payload;
      })

      // --- Fetch user ---
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

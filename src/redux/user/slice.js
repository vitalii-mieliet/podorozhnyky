import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCreatedStories,
  fetchSavedStories,
  fetchUserInfo,
} from './operations';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  savedStories: [],
  createdStories: [],
  storiesLoading: false,
  storiesError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      // user info
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Щось пішло не так';
      })

      // saved stories
      .addCase(fetchSavedStories.pending, (state) => {
        state.storiesLoading = true;
        state.storiesError = null;
        // optionally clear previous
        state.savedStories = [];
      })
      .addCase(fetchSavedStories.fulfilled, (state, action) => {
        state.storiesLoading = false;
        state.savedStories = action.payload;
      })
      .addCase(fetchSavedStories.rejected, (state, action) => {
        state.storiesLoading = false;
        state.storiesError =
          action.payload || 'Не вдалося завантажити збережені історії';
      })

      // created stories
      .addCase(fetchCreatedStories.pending, (state) => {
        state.storiesLoading = true;
        state.storiesError = null;
        state.createdStories = [];
      })
      .addCase(fetchCreatedStories.fulfilled, (state, action) => {
        state.storiesLoading = false;
        state.createdStories = action.payload;
      })
      .addCase(fetchCreatedStories.rejected, (state, action) => {
        state.storiesLoading = false;
        state.storiesError =
          action.payload || 'Не вдалося завантажити створені історії';
      });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;

export const authActions = userSlice.actions;

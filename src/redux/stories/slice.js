import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllStories,
  fetchStoryById,
  fetchUserStories,
} from './operations';

const initialState = {
  items: [],
  currentStory: null,
  isLoading: false,
  error: null,
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllStories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        state.items = action.payload.data.data;
      })
      .addCase(fetchAllStories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchStoryById.pending, (state) => {
        state.isLoading = true;
        state.currentStory = null;
      })
      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        state.currentStory = action.payload.data;
      })
      .addCase(fetchStoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // User Stories (saved or created)
      .addCase(fetchUserStories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.items = [];
      })
      .addCase(fetchUserStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserStories.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || 'Помилка при завантаженні історій користувача';
      });
  },
});

export default storiesSlice.reducer;

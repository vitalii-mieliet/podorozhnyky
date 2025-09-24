import { createSlice } from '@reduxjs/toolkit';
import { fetchAllStories, fetchStoryById } from './operations';

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
      });
  },
});

export default storiesSlice.reducer;

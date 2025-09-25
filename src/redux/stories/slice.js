import { createSlice } from '@reduxjs/toolkit';
import { fetchAllStories, fetchStoryById } from './operations';

const initialState = {
  items: [],
  currentStory: null,
  isLoading: false,
  error: null,
  nextPage: false, // added
  prevPage: false, // added
  totalItems: null, // added
  totalPages: null, // added
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

        // state.items = action.payload.data.data; // was

        state.items = [...state.items, ...action.payload.data.data]; // added
        state.totalItems = action.payload.data.totalItems; // added
        state.totalPages = action.payload.data.totalPages; // added
        state.nextPage = action.payload.data.hasNextPage; // added
        state.prevPage = action.payload.data.hasPreviousPage; // added
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

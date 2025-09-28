import { createSlice } from '@reduxjs/toolkit';
import { fetchCreateStories, fetchStories, fetchStoryById } from './operations';

const initialState = {
  items: [],
  currentStory: null,
  itemsStatus: 'idle',
  currentStoryStatus: 'idle',
  error: null,
  hasNextPage: false,
  totalPages: null,
  isLoading: false,
  totalItems: null,

  author: {
    name: null,
    avatar: null,
    status: 'idle',
    error: null,
    bio: null,
  },
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    resetCurrentStory: (state) => {
      state.currentStory = null;
      state.currentStoryStatus = 'idle';
    },

    resetStories: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // --- stories ---
      .addCase(fetchStories.pending, (state) => {
        state.isLoading = true;
        state.itemsStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsStatus = 'succeeded';
        state.items = [...state.items, ...action.payload.data];
        state.hasNextPage = action.payload.hasNextPage;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.isLoading = false;
        state.itemsStatus = 'failed';
        state.error = action.payload;
      })

      // story by id
      .addCase(fetchStoryById.pending, (state) => {
        state.currentStoryStatus = 'loading';
      })
      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.currentStoryStatus = 'succeeded';
        state.currentStory = action.payload;
      })
      .addCase(fetchStoryById.rejected, (state, action) => {
        state.currentStoryStatus = 'failed';
        state.error = action.payload;
      })

      // create story
      .addCase(fetchCreateStories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(fetchCreateStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload.data);
      })
      .addCase(fetchCreateStories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { applyFilters, resetCurrentStory, resetStories } =
  storiesSlice.actions;
export default storiesSlice.reducer;

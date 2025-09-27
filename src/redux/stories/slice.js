import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCategories,
  fetchCreateStories,
  fetchStories,
  fetchStoryById,
} from './operations';

const initialState = {
  allItems: [],
  items: [],
  category: [],
  currentStory: null,
  itemsStatus: 'idle',
  currentStoryStatus: 'idle',
  isLoadingMore: false,
  error: null,
  hasNextPage: false,
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    applyFilters: (state, action) => {
      const { category, page, perPage } = action.payload;

      const filteredStories =
        category === 'Всі історії'
          ? state.allItems
          : state.allItems.filter((story) => story.category === category);

      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      state.items = filteredStories.slice(startIndex, endIndex);

      state.hasNextPage = endIndex < filteredStories.length;
    },
    resetCurrentStory: (state) => {
      state.currentStory = null;
      state.currentStoryStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.itemsStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.itemsStatus = 'succeeded';
        state.allItems = action.payload.data;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.itemsStatus = 'failed';
        state.error = action.payload;
      })

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

      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

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

export const { applyFilters, resetCurrentStory } = storiesSlice.actions;
export default storiesSlice.reducer;

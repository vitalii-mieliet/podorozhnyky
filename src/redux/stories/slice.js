import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllStories,
  fetchStoryById,
  getStoriesAuthorsById,
} from './operations';

const initialState = {
  allItems: [],
  items: [],
  currentStory: null,
  itemsStatus: 'idle',
  currentStoryStatus: 'idle',
  isLoadingMore: false,
  error: null,
  hasNextPage: false,

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

      .addCase(fetchAllStories.pending, (state) => {
        state.itemsStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAllStories.fulfilled, (state, action) => {
        state.itemsStatus = 'succeeded';
        state.allItems = action.payload.data;
      })
      .addCase(fetchAllStories.rejected, (state, action) => {
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

      // --- Author loading state handlers ---
      .addCase(getStoriesAuthorsById.pending, (state) => {
        state.author.status = 'loading';
        state.author.error = null;
      })
      .addCase(getStoriesAuthorsById.fulfilled, (state, action) => {
        state.author.status = 'succeeded';
        state.author.name = action.payload.name;
        state.author.avatar = action.payload.avatar;
        state.author.bio = action.payload.bio;
      })
      .addCase(getStoriesAuthorsById.rejected, (state, action) => {
        state.author.status = 'failed';
        state.author.error = action.payload;
      });
  },
});

export const { applyFilters, resetCurrentStory } = storiesSlice.actions;
export default storiesSlice.reducer;

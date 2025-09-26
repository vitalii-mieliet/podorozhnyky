// src/redux/stories/slice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCategories,
  fetchCreateStories,
  fetchStories,
  fetchStoryById,
} from './operations';

const initialState = {
  items: [],
  category: [],
  currentStory: null,
  // --- ИЗМЕНЕНО: Разделяем статусы ---
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
    // Редьюсер для сброса состояния при размонтировании страницы
    resetCurrentStory: (state) => {
      state.currentStory = null;
      state.currentStoryStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.itemsStatus = 'loading'; // Используем itemsStatus
        } else {
          state.isLoadingMore = true;
        }
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.itemsStatus = 'succeeded'; // Используем itemsStatus
        state.isLoadingMore = false;
        state.error = null;
        const { data, hasNextPage, page } = action.payload;
        if (page === 1) {
          state.items = data;
        } else {
          state.items = [...state.items, ...data];
        }
        state.hasNextPage = hasNextPage;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.itemsStatus = 'failed'; // Используем itemsStatus
        state.isLoadingMore = false;
        state.error = action.payload;
      })
      .addCase(fetchStoryById.pending, (state) => {
        state.currentStoryStatus = 'loading'; // Используем currentStoryStatus
      })
      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.currentStoryStatus = 'succeeded'; // Используем currentStoryStatus
        state.currentStory = action.payload; // --- ВАЖНОЕ ИСПРАВЛЕНИЕ ---
      })
      .addCase(fetchStoryById.rejected, (state, action) => {
        state.currentStoryStatus = 'failed'; // Используем currentStoryStatus
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

export const { resetCurrentStory } = storiesSlice.actions; // Экспортируем новый редьюсер
export default storiesSlice.reducer;

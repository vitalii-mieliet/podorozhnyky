// src/redux/stories/slice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchStories, fetchStoryById } from './operations';

const initialState = {
  items: [],
  currentStory: null,
  // --- ИЗМЕНЕНО: Разделяем статусы ---
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
      });
  },
});

export const { resetCurrentStory } = storiesSlice.actions; // Экспортируем новый редьюсер
export default storiesSlice.reducer;

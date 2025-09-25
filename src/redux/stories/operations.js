// src/redux/stories/operations.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchStories = createAsyncThunk(
  'stories/fetch',
  async ({ page = 1, limit = 9 }, thunkAPI) => { // Увеличим лимит по умолчанию
    try {
      const response = await api.get('/stories', {
        params: { page, limit },
      });
      // --- ИСПРАВЛЕНО ---
      // Возвращаем данные из более глубокого уровня вложенности
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchStoryById = createAsyncThunk(
  'stories/fetchById',
  async (storyId, thunkAPI) => {
    try {
      const response = await api.get(`/stories/story/${storyId}`);
      // --- ИСПРАВЛЕНО ---
      // Возвращаем сам объект истории, а не весь ответ
      return response.data.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
}
  }
  
);
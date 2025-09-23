import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api'; // Імпортуємо налаштований екземпляр axios

/**
 * Thunk для отримання списку всіх історій.
 * Використовує ендпоінт: GET /stories
 */
export const fetchAllStories = createAsyncThunk(
  'stories/fetchAll',
  async (_, thunkAPI) => {
    try {
      // Повертаємо реальний запит до API
      const response = await api.get('/stories');
      return response.data; // response.data - це весь об'єкт з бекенду
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Thunk для отримання однієї історії за її ID.
 * Використовує ендпоінт: GET /stories/story/{id}
 */
export const fetchStoryById = createAsyncThunk(
  'stories/fetchById',
  async (storyId, thunkAPI) => {
    try {
      const response = await api.get(`/stories/story/${storyId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
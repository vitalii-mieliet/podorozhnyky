import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchAllStories = createAsyncThunk(
  'stories/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/stories');
      return response.data;
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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Fetch user-specific stories (saved or created)

export const fetchUserStories = createAsyncThunk(
  'stories/fetchUserStories',
  async (tab, thunkAPI) => {
    try {
      const endpoint =
        tab === 'saved' ? '/users/save-story' : '/users/created-stories';
      const response = await api.get(endpoint);
      return response.data.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          'Не вдалося завантажити історії користувача'
      );
    }
  }
);

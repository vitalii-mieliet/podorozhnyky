import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/users/info');
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Не вдалося завантажити профіль'
      );
    }
  }
);

export const fetchSavedStories = createAsyncThunk(
  'user/fetchSavedStories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/users/saved-stories');
      return res.data.data || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          'Не вдалося завантажити збережені історії'
      );
    }
  }
);

export const fetchCreatedStories = createAsyncThunk(
  'user/fetchCreatedStories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/users/created-stories');
      return res.data.data || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Не вдалося завантажити створені історії'
      );
    }
  }
);

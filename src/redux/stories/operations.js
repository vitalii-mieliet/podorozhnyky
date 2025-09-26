import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchStories = createAsyncThunk(
  'stories/fetch',
  async ({ page = 1, perPage = 9, category = '' }, thunkAPI) => {
    try {
       
      const response = await api.get('/stories', {
        params: { page, perPage, category },
      });
      
      const payload = response.data.data;
 
      if (Array.isArray(payload.data)) {
        payload.data = payload.data.slice(0, perPage);
      }
      
      return payload;

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
      return response.data.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllStories = createAsyncThunk(
  'stories/fetchAll',
  async (_, thunkAPI) => {
    try { 
      const response = await api.get('/stories?perPage=1000');  
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

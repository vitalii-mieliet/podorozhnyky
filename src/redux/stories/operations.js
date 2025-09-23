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
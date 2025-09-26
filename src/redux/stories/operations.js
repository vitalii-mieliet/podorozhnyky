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

export const fetchCategories = createAsyncThunk(
  'stories/categories',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/stories/category');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCreateStories = createAsyncThunk(
  'stories/addStory',
  async (values, thunkAPI) => {
    try {
      const formData = new FormData();

      formData.append('title', values.title);
      formData.append('category', values.category);
      formData.append('article', values.article);
      formData.append('fullText', values.fullText);

      if (values.img) {
        formData.append('photo', values.img);
      }

      const response = await api.post('/stories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// --- fetch author info by authorId ---
export const getStoriesAuthorsById = createAsyncThunk(
  'stories/fetchAuthorById',
  async (userId, thunkAPI) => {
    try {
      const response = await api.get(`/stories/authors/${userId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
});

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('/auth/login', credentials, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

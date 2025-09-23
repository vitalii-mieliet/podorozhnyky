import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Fetch authenticated user info

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token used in fetchUserInfo:', token);

      const res = await axios.get(
        'https://plantains-app.onrender.com/api/users/info',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data;
    } catch (err) {
      console.error('fetchUserInfo error:', err.response || err.message);
      return rejectWithValue(
        err.response?.data?.message || 'Не вдалося завантажити профіль'
      );
    }
  }
);

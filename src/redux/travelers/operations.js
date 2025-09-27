import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchTravellers = createAsyncThunk(
  'travelers/fetchTravellers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/stories/authors', {
        params,
      });

      return response.data.data; // повертає { data, page, totalPages ... }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

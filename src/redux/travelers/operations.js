import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchTravellers = createAsyncThunk(
  'travelers/fetchTravellers',
  async (
    { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc' },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get('/stories/travelers', {
        params: { page, perPage, sortBy, sortOrder },
      });

      return response.data.data; // повертає { data, page, totalPages ... }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

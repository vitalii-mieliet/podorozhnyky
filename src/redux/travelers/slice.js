import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api'; // твой axios instance

export const fetchTravellers = createAsyncThunk(
  'travelers/fetchTravellers',
  async ({ page = 1, perPage = 10 } = {}, thunkAPI) => {
    try {
      const response = await api.get('/stories/travelers', {
        params: { page, perPage, sortBy: 'name', sortOrder: 'asc' },
      });
      // response.data.data — объект с data, page, totalPages и тд
      return response.data.data || {}; // безопасно
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Server error');
    }
  }
);

const travelersSlice = createSlice({
  name: 'travelers',
  initialState: {
    list: [],
    page: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTravellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTravellers.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};
        state.list = payload.data || [];
        state.page = payload.page || 1;
        state.perPage = payload.perPage || 10;
        state.totalItems = payload.totalItems || 0;
        state.totalPages = payload.totalPages || 0;
        state.hasNextPage = payload.hasNextPage || false;
        state.hasPreviousPage = payload.hasPreviousPage || false;
      })
      .addCase(fetchTravellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching travelers';
      });
  },
});

export default travelersSlice.reducer;

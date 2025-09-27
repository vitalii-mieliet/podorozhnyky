import { createSlice } from '@reduxjs/toolkit';
import { fetchTravellers } from '../travelers/operations';

const initialState = {
  items: [],
  pagination: {
    page: 1,
    perPage: 4,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  isLoading: false,
  error: null,
};

const ourTravellersSlice = createSlice({
  name: 'ourTravellers',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTravellers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTravellers.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, ...pagination } = action.payload;
        if (pagination.page === 1) {
          state.items = data;
        } else {
          state.items = [...state.items, ...data];
        }
        state.pagination = pagination;
      })
      .addCase(fetchTravellers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default ourTravellersSlice.reducer;

export const ourTravellersActions = ourTravellersSlice.actions;

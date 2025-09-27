import { createSlice } from '@reduxjs/toolkit';
import { fetchTravellers } from '../travelers/operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const ourTravellersSlice = createSlice({
  name: 'ourTravellers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTravellers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTravellers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchTravellers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default ourTravellersSlice.reducer;

export const selectOurTravellers = (state) => state.ourTravellers.items;

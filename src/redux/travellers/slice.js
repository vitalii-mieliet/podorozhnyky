import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const travelersSlice = createSlice({
  name: travelers,
  initialState,
  reducers: {},
});

export default travelersSlice.reducer;

export const authActions = travelersSlice.actions;

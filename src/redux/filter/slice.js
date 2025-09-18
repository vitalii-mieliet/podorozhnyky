import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stories: {}
  travelers: {}
};

const filterSlice = createSlice({
  name: filter,
  initialState,
  reducers: {},
});

export default filterSlice.reducer;

export const authActions = filterSlice.actions;

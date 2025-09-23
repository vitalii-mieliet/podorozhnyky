import { createSlice } from '@reduxjs/toolkit';
import { fetchAllStories, fetchStoryById } from './operations';

const initialState = {
  items: [],
  currentStory: null,
  isLoading: false,
  error: null,
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обробка запиту за списком історій
      .addCase(fetchAllStories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // ВИПРАВЛЕНО: Беремо масив за правильним шляхом action.payload.data.data
        state.items = action.payload.data.data;
      })
      .addCase(fetchAllStories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Обробка запиту за однією історією
      .addCase(fetchStoryById.pending, (state) => {
        state.isLoading = true;
        state.currentStory = null;
      })
      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Припускаємо, що для однієї історії структура відповіді може бути іншою
        // Якщо тут теж буде вкладеність, шлях потрібно буде уточнити
        state.currentStory = action.payload.data;
      })
      .addCase(fetchStoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default storiesSlice.reducer;
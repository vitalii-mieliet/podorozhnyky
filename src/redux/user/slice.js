import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCreatedStories,
  fetchSavedStories,
  fetchCurrentUser,
  saveStory,
  unsaveStory,
} from './operations';

const initialProfile = {
  _id: null,
  name: '',
  email: '',
  bio: '',
  avatar: '',
  onboardingCompleted: false,
  savedStories: [],
  settings: {},
  socialLinks: {},
};

const initialCollectionState = {
  data: [],
  page: 1,
  perPage: 6,
  totalItems: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

const initialState = {
  userData: initialProfile,
  isLoading: false,
  error: null,
  savedStories: { ...initialCollectionState },
  createdStories: { ...initialCollectionState },
  storiesLoading: false,
  storiesError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      // user info
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Щось пішло не так';
      })

      // saved stories
      .addCase(fetchSavedStories.pending, (state) => {
        state.storiesLoading = true;
        state.storiesError = null;
      })
      .addCase(fetchSavedStories.fulfilled, (state, action) => {
        state.storiesLoading = false;
        state.savedStories = action.payload;
      })
      .addCase(fetchSavedStories.rejected, (state, action) => {
        state.storiesLoading = false;
        state.storiesError =
          action.payload || 'Не вдалося завантажити збережені історії';
      })

      .addCase(fetchCreatedStories.pending, (state) => {
        state.storiesLoading = true;
        state.storiesError = null;
      })
      .addCase(fetchCreatedStories.fulfilled, (state, action) => {
        state.storiesLoading = false;
        state.createdStories = action.payload;
      })
      .addCase(fetchCreatedStories.rejected, (state, action) => {
        state.storiesLoading = false;
        state.storiesError =
          action.payload || 'Не вдалося завантажити створені історії';
      })
      .addCase(saveStory.fulfilled, (state, action) => {
        state.savedStories.push(action.payload);
      })
      .addCase(unsaveStory.fulfilled, (state, action) => {
        state.savedStories = state.savedStories.filter(
          (id) => id !== action.payload
        );
      });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;

export const userActions = userSlice.actions;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import userReducer from './user/slice';
import storiesReducer from './stories/slice';
import travelersReducer from './travelers/slice';
import storiesPopularReducer from './popularStories/slice';
import ourTravellersReducer from './ourTravellers/slice';
import listenerMiddleware from './listenerMiddleware';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  stories: storiesReducer,
  travelers: travelersReducer,
  popularStories: storiesPopularReducer, // редьюсер для популярних історій
  ourTravellers: ourTravellersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

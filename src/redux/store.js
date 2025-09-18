import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReduser from './auth/slice';
import userReduser from './user/slice';
import storiesReduser from './stories/slice';
import travelersReduser from './travelers/slice';
import filterReduser from './filter/slice';

const rootReduser = combineReducers({
  auth: authReduser,
  auth: userReduser,
  auth: storiesReduser,
  auth: travelersReduser,
  auth: filterReduser,
});

export const store = configureStore({
  reducer: rootReduser,
});

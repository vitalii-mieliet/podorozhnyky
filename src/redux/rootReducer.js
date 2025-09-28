import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import userReducer from './user/slice';
import storiesReducer from './stories/slice';
import travelersReducer from './travelers/slice';
import storiesPopularReducer from './popularStories/slice';
import ourTravellersReducer from './ourTravellers/slice';
import { logoutUser } from './auth/operations';

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  stories: storiesReducer,
  travelers: travelersReducer,
  popularStories: storiesPopularReducer, // редьюсер для популярних історій
  ourTravellers: ourTravellersReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logoutUser.fulfilled.type) {
    return appReducer(
      {
        ...state,
        //reset private slices to initialState
        auth: undefined,
        user: undefined,
      },
      action
    );
  }
  return appReducer(state, action);
};

export default rootReducer;

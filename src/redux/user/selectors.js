export const selectUserProfile = (state) => state.user.userData;
export const selectUserLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;

export const selectSavedStories = (state) => state.user.savedStories;
export const selectCreatedStories = (state) => state.user.createdStories;
export const selectStoriesLoading = (state) => state.user.storiesLoading;
export const selectStoriesError = (state) => state.user.storiesError;

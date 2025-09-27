export const selectOurTravellers = (state) => state.ourTravellers.items;
export const selectOurTravellersLoading = (state) =>
  state.ourTravellers.isLoading;
export const selectOurTravellersError = (state) => state.ourTravellers.error;

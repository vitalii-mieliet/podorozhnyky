import { createListenerMiddleware } from '@reduxjs/toolkit';
import { loginUser, logoutUser, refreshUser } from './auth/operations';
import { fetchCurrentUser } from './user/operations';
import { logout } from './auth/slice';

const listenerMiddleware = createListenerMiddleware();
const startAppListening = listenerMiddleware.startListening;

const handleLogout = async (_, listenerApi) => {
  await listenerApi.dispatch(logout());
};

startAppListening({
  actionCreator: loginUser.fulfilled,
  effect: async (_, listenerApi) => {
    await listenerApi.dispatch(fetchCurrentUser());
  },
});

startAppListening({
  actionCreator: refreshUser.fulfilled,
  effect: async (_, listenerApi) => {
    await listenerApi.dispatch(fetchCurrentUser()); // подтянуть профиль
  },
});

startAppListening({
  actionCreator: logoutUser.fulfilled,
  effect: handleLogout,
});

export default listenerMiddleware;

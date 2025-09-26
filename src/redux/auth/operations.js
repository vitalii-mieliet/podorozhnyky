import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from '../../services/api/tokenStore';

// REGISTER
export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      await api.post('/auth/register', credentials);
      const { name: _, ...loginCredentials } = credentials;
      await dispatch(loginUser(loginCredentials));
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      setAccessToken(data.data.accessToken);
      console.info('Login: ', getAccessToken());
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// REFRESH
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/refresh');
      setAccessToken(data.data.accessToken);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Refresh failed');
    }
  },
  {
    condition: (_, { getState }) => {
      const { isLoggedIn } = getState().auth;

      return isLoggedIn;
    },
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
      clearAccessToken();
      console.info('Logout: ', getAccessToken());
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Refresh failed');
    }
  }
);

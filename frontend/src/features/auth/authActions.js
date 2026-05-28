import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from './authService';
import { setAccessToken } from '@/features/auth/authSlice';
import { fetchMe } from '../profile';
import { clearProfile } from '@/features/profile/profileSlice';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const res = await authApi.login(credentials);
      dispatch(setAccessToken(res.data.access_token));
      await dispatch(fetchMe());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    await authApi.logout();
    dispatch(clearProfile());
  },
);

export const signUpThunk = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authApi.register(credentials);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message ?? err.message);
    }
  },
);

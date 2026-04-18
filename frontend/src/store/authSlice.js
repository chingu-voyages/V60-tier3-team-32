import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from '../api/auth';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authApi.login(credentials);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await authApi.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAuth: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        // console.log('fulfilled payload:', action.payload);
        state.loading = false;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        localStorage.setItem('accessToken', action.payload.access_token);
        localStorage.setItem('refreshToken', action.payload.refresh_token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;

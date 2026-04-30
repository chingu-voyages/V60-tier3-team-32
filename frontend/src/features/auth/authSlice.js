import { createSlice } from '@reduxjs/toolkit';

import { loginThunk, logoutThunk, signUpThunk } from '@/features/auth';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: localStorage.getItem('accessToken') || null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAuth: (state) => {
      state.accessToken = null;
      state.error = null;
      localStorage.removeItem('accessToken');
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
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
        localStorage.setItem('accessToken', action.payload.access_token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access_token;
        localStorage.setItem('accessToken', action.payload.access_token);
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = null;
        state.error = null;
        localStorage.removeItem('accessToken');
      });
  },
});

export const { clearAuth, setAccessToken } = authSlice.actions;
export default authSlice.reducer;

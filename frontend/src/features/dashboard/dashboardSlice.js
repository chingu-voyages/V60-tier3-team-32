import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardData } from './dashboardActions';

const initialState = {
  user: null,
  prompts: null,
  recentPosts: [],
  correctedPosts: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        // console.log(action.payload.recentPosts[0]);
        state.loading = false;
        state.user = action.payload.user;
        state.recentPosts = [...action.payload.recentPosts].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        state.submittedPosts = action.payload.submittedPosts;
        state.correctedPosts = action.payload.correctedPosts;
        state.prompts = action.payload.prompts;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;

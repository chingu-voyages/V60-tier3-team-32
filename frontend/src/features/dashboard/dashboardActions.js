import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDashboardData } from './dashboardService';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getDashboardData();

      // console.log('dashboard data:', data);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch dashboard data',
      );
    }
  },
);

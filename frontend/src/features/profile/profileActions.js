import { createAsyncThunk } from '@reduxjs/toolkit';
import * as profileService from './profileService';

export const fetchMe = createAsyncThunk(
  'profile/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const res = await profileService.getMe();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message ?? err.message);
    }
  },
);

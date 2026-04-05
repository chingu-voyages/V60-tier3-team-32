import { createAsyncThunk } from '@reduxjs/toolkit';
import testService from './testService';

export const fetchTest = createAsyncThunk(
  'test/fetch',
  async (_, thunkAPI) => {
    try {
      return await testService.getTest();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
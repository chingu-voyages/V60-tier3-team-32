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


// Create Test 
export const addTest = createAsyncThunk(
  'test/add',
  async (testData, thunkAPI) => {
    try {
      return await testService.createTest(testData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
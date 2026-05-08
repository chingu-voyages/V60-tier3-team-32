import { createAsyncThunk } from '@reduxjs/toolkit';
import { createPostAPI, fetchTodayPromptsAPI } from './writeService';

export const fetchTodayPrompts = createAsyncThunk(
  'write/fetchTodayPrompts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchTodayPromptsAPI();
      console.log('prompts data', data);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch prompts',
      );
    }
  },
);

export const createPost = createAsyncThunk(
  'write/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      return await createPostAPI(postData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create post',
      );
    }
  },
);

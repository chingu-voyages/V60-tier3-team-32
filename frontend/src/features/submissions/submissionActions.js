import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getSubmissions,
  getSubmissionById,
  deletePost,
} from './submissionService';

export const fetchSubmissions = createAsyncThunk(
  'submissions/fetchSubmissions',
  async (_, { rejectWithValue }) => {
    try {
      return await getSubmissions();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load submissions.',
      );
    }
  },
);

export const fetchSubmissionById = createAsyncThunk(
  'submissions/fetchSubmissionById',
  async (id, { rejectWithValue }) => {
    try {
      return await getSubmissionById(id);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Submission not found.',
      );
    }
  },
);

export const deletePostById = createAsyncThunk(
  'submissions/deletePostById',
  async (postId, { rejectWithValue }) => {
    try {
      await deletePost(postId);

      return postId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete post',
      );
    }
  },
);

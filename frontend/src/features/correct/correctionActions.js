import { createAsyncThunk } from '@reduxjs/toolkit';
import { submitCorrection, getCorrectionQueue } from './correctionService';

export const createCorrection = createAsyncThunk(
  'corrections/createCorrection',
  async ({ id, correctionData }, { rejectWithValue }) => {
    try {
      return await submitCorrection(id, correctionData);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to submit correction.'
      );
    }
  }
);

export const fetchCorrectionQueue = createAsyncThunk(
  'corrections/fetchCorrectionQueue',
  async (_, { rejectWithValue }) => {
    try {
      return await getCorrectionQueue();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load correction queue.'
      );
    }
  }
);
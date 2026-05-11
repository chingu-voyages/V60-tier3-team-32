import { createAsyncThunk } from '@reduxjs/toolkit';
import { submitCorrection, getCorrectionQueue, getMyCorrections } from './correctionService';

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



// export const fetchMyCorrections = createAsyncThunk(
//   'corrections/fetchMyCorrections',
//   async (_, { rejectWithValue }) => {
//     try {
//       return await getMyCorrections();
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || 'Failed to load your corrections.'
//       );
//     }
//   }
// );




export const fetchMyCorrections = createAsyncThunk(
  'corrections/fetchMyCorrections',
  async (type, { rejectWithValue }) => {
    try {
      // type will be 'made' or 'received'
      return await getMyCorrections(type);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load corrections.'
      );
    }
  }
);
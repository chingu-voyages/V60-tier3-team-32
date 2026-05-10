import { createSlice } from '@reduxjs/toolkit';
import { createCorrection, fetchCorrectionQueue } from './correctionActions';

const initialState = {
  queue: [], // Posts waiting for correction
  loading: false,
  error: null,
  // Using the submission pattern for specific action tracking
  submitting: false,
  submitError: null,
  submitSuccess: false,
};

const correctionSlice = createSlice({
  name: 'corrections',
  initialState,
  reducers: {
    resetCorrectionStatus: (state) => {
      state.submitting = false;
      state.submitError = null;
      state.submitSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetching the Queue
      .addCase(fetchCorrectionQueue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCorrectionQueue.fulfilled, (state, action) => {
        state.loading = false;
        state.queue = action.payload;
      })
      .addCase(fetchCorrectionQueue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Creating a Correction
      .addCase(createCorrection.pending, (state) => {
        state.submitting = true;
        state.submitError = null;
        state.submitSuccess = false;
      })
      .addCase(createCorrection.fulfilled, (state) => {
        state.submitting = false;
        state.submitSuccess = true;
      })
      .addCase(createCorrection.rejected, (state, action) => {
        state.submitting = false;
        state.submitError = action.payload;
      });
  },
});

export const { resetCorrectionStatus } = correctionSlice.actions;
export default correctionSlice.reducer;
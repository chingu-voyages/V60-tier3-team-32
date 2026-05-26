import { createSlice } from '@reduxjs/toolkit';
import {
  createCorrection,
  fetchCorrectionQueue,
  fetchMyCorrections,
} from './correctionActions';

const initialState = {
  queue: [], // Posts waiting for correction
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1,
  },

  myCorrections: [], // User's personal correction history (both made & received)
  activeTab: 'made', // Tracks the current view: 'made' or 'received'
  loading: false,
  error: null,

  // Submission tracking
  submitting: false,
  submitError: null,
  submitSuccess: false,
};

const correctionSlice = createSlice({
  name: 'corrections',
  initialState,
  reducers: {
    // Call this when switching tabs in the UI before fetching
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      // Optional: Clear current list so user doesn't see old data while loading new tab
      state.myCorrections = [];
    },
    resetCorrectionStatus: (state) => {
      state.submitting = false;
      state.submitError = null;
      state.submitSuccess = false;
    },
    clearCorrectionHistory: (state) => {
      state.myCorrections = [];
      state.activeTab = 'made';
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetching the Correction Queue ---
      .addCase(fetchCorrectionQueue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCorrectionQueue.fulfilled, (state, action) => {
        state.loading = false;
        state.queue = action.payload.data;
        state.pagination = action.payload.pagination;
        console.log('fulfilled payload:', action.payload);
      })
      .addCase(fetchCorrectionQueue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Fetching Personal Corrections (Made OR Received) ---
      .addCase(fetchMyCorrections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyCorrections.fulfilled, (state, action) => {
        state.loading = false;
        state.myCorrections = action.payload;
      })
      .addCase(fetchMyCorrections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Creating a Correction ---
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

export const { resetCorrectionStatus, clearCorrectionHistory, setActiveTab } =
  correctionSlice.actions;

export default correctionSlice.reducer;

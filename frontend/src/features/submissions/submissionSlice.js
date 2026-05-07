import { createSlice } from '@reduxjs/toolkit';
import { fetchSubmissions, fetchSubmissionById } from './submissionActions';

const initialState = {
  submissions: [],
  selectedSubmission: null,
  loading: false,
  detailLoading: false,
  error: null,
  detailError: null,
};

const submissionSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    clearSelectedSubmission: (state) => {
      state.selectedSubmission = null;
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
      })
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSubmissionById.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
        state.selectedSubmission = null;
      })
      .addCase(fetchSubmissionById.fulfilled, (state, action) => {
        state.detailLoading = false;
        console.log('payload corrections:', action.payload.corrections);
        state.selectedSubmission = action.payload;
      })
      .addCase(fetchSubmissionById.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload;
      });
  },
});

export const { clearSelectedSubmission } = submissionSlice.actions;
export default submissionSlice.reducer;

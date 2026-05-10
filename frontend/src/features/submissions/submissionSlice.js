import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSubmissions,
  fetchSubmissionById,
  deletePostById,
} from './submissionActions';

const initialState = {
  submissions: [],
  selectedSubmission: null,
  loading: false,
  detailLoading: false,
  deleteLoading: false,
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
        state.submissions = [...action.payload].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
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
        // console.log('payload corrections:', action.payload.corrections);
        state.selectedSubmission = action.payload;
      })
      .addCase(fetchSubmissionById.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload;
      })
      .addCase(deletePostById.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deletePostById.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.submissions = state.submissions.filter(
          (post) => post.id !== action.payload,
        );

        state.submissions = state.submissions.filter(
          (post) => post._id !== action.payload,
        );

        // clear selected submission if user deletes the one currently open
        if (state.selectedSubmission?._id === action.payload) {
          state.selectedSubmission = null;
        }
      })
      .addCase(deletePostById.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedSubmission } = submissionSlice.actions;
export default submissionSlice.reducer;

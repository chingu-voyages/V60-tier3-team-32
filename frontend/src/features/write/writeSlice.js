import { createSlice } from '@reduxjs/toolkit';
import { createPost, fetchTodayPrompts, updatePost } from './writeActions';

const initialState = {
  prompts: {
    native: [],
    learning: [],
  },
  currentPromptIndex: 0,
  activePromptType: 'learning',

  currentDraft: null,

  loading: false,
  submitting: false,
  updating: false,

  error: null,
  submitSuccess: false,
  updateSuccess: false,
};

const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    nextPrompt: (state, action) => {
      const promptsLength = action.payload;

      if (promptsLength > 0) {
        state.currentPromptIndex =
          (state.currentPromptIndex + 1) % promptsLength;
      }
    },
    setActivePromptType: (state, action) => {
      state.activePromptType = action.payload;
      state.currentPromptIndex = 0;
    },
    setCurrentDraft: (state, action) => {
      state.currentDraft = action.payload;
    },

    clearCurrentDraft: (state) => {
      state.currentDraft = null;
      state.submitSuccess = false;
      state.updateSuccess = false;
      state.error = null;
    },

    resetWriteStatus: (state) => {
      state.submitSuccess = false;
      state.updateSuccess = false;
      state.error = null;
    },
    resetSubmitSuccess: (state) => {
      state.submitSuccess = false;
    },
    resetUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodayPrompts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodayPrompts.fulfilled, (state, action) => {
        state.loading = false;

        state.prompts = {
          native: action.payload.data?.native || [],
          learning: action.payload.data?.learning || [],
        };
      })
      .addCase(fetchTodayPrompts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createPost.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.submitting = false;
        state.submitSuccess = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      .addCase(updatePost.pending, (state) => {
        state.updating = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.updating = false;
        state.currentDraft = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const {
  nextPrompt,
  setActivePromptType,
  setCurrentDraft,
  clearCurrentDraft,
  resetWriteStatus,
  resetSubmitSuccess,
  resetUpdateSuccess,
} = writeSlice.actions;

export default writeSlice.reducer;

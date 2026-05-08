import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prompts: [],
  currentPromptIndex: 0,
  createdPost: null,
  loading: false,
  submitting: false,
  error: null,
  submitSuccess: false,
};

const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    nextPrompt: (state) => {
      if (state.prompts.length > 0) {
        state.currentPromptIndex =
          (state.currentPromptIndex + 1) % state.prompts.length;
      }
    },

    resetSubmitState: (state) => {
      state.createdPost = null;
      state.submitSuccess = false;
      state.error = null;
    },
  },
});

export default writeSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { fetchTest } from './testActions';

const initialState = {
  message: '',
  status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
  error: null
};

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTest.fulfilled, (state, action) => {
        state.status = 'success';
        state.message = action.payload.message;
      })
      .addCase(fetchTest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { reset } = testSlice.actions;
export default testSlice.reducer;
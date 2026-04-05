import { createSlice } from '@reduxjs/toolkit';
import { fetchTest, addTest } from './testActions';

const initialState = {
  items: [], 
  status: 'idle',
  error: null
};

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      // Fetching Logic
      .addCase(fetchTest.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchTest.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload; 
      })
      .addCase(fetchTest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Adding Logic
      .addCase(addTest.fulfilled, (state, action) => {
        state.items.push(action.payload); 
      });
  },
});

export const { reset } = testSlice.actions;
export default testSlice.reducer;
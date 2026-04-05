import { configureStore } from '@reduxjs/toolkit';
import testReducer from '../features/test/testSlice';

export const store = configureStore({
  reducer: {
    test: testReducer,
  },
});
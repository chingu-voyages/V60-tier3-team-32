import { configureStore } from '@reduxjs/toolkit';
import testReducer from '../features/test/testSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    test: testReducer,
    auth: authReducer,
  },
});

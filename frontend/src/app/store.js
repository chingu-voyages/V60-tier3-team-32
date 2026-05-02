import { configureStore } from '@reduxjs/toolkit';
import testReducer from '../features/test/testSlice';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    test: testReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});

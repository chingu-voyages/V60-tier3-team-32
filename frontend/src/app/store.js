import { configureStore } from '@reduxjs/toolkit';
import testReducer from '../features/test/testSlice';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import submissionsReducer from '@/features/submissions/submissionSlice';

export const store = configureStore({
  reducer: {
    test: testReducer,
    auth: authReducer,
    profile: profileReducer,
    dashboard: dashboardReducer,
    submissions: submissionsReducer,
  },
});

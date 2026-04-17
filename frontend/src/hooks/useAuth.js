import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginThunk, logoutThunk } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { accessToken, refreshToken, loading, error } = useAppSelector(
    (state) => state.auth,
  );

  return {
    accessToken,
    refreshToken,
    loading,
    error,
    isAuthenticated: !!accessToken,
    login: (credentials) => dispatch(loginThunk(credentials)),
    logout: () => dispatch(logoutThunk()),
  };
};

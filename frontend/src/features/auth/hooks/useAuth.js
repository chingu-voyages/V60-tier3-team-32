import { loginThunk, signUpThunk } from '../authActions';
import { clearAuth } from '../authSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

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
    register: (data) => dispatch(signUpThunk(data)),
    logout: () => dispatch(clearAuth()),
  };
};

import { loginThunk, signUpThunk, logoutThunk } from '../authActions';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { accessToken, loading, error } = useAppSelector((state) => state.auth);

  return {
    accessToken,
    loading,
    error,
    isAuthenticated: !!accessToken,
    login: (credentials) => dispatch(loginThunk(credentials)),
    register: (data) => dispatch(signUpThunk(data)),
    logout: () => dispatch(logoutThunk()),
  };
};

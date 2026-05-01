import { loginThunk, signUpThunk, logoutThunk } from '../authActions';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { accessToken, loading, error } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.profile.user);
  return {
    accessToken,
    user,
    loading,
    error,
    isAuthenticated: !!accessToken,
    login: (credentials) => dispatch(loginThunk(credentials)),
    register: (data) => dispatch(signUpThunk(data)),
    logout: () => dispatch(logoutThunk()),
  };
};

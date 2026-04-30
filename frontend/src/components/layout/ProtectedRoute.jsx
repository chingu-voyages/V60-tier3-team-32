import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../features/auth/authSlice';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const tryRefresh = async () => {
      if (!isAuthenticated) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            {},
            { withCredentials: true },
          );
          dispatch(setAccessToken(data.access_token));
        } catch {
          // no valid session, will redirect to login
        }
      }
      setChecking(false);
    };

    tryRefresh();
  }, []);

  if (checking) return null; // or a spinner

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUser } from '@/features/auth/authSlice';
import { fetchMe } from '@/features/profile';

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        dispatch(setAccessToken(data.access_token));
        await dispatch(fetchMe());
      } catch {
        // not logged in, ignore
        dispatch(setAccessToken(null));
        dispatch(setUser(null));
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [dispatch]);

  if (loading) return null; // or spinner

  return children;
}

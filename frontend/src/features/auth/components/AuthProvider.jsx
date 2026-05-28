import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '@/features/auth/authSlice';
import { fetchMe } from '@/features/profile';
import PageLoader from '@/components/layout/PageLoader';

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        // console.log('refresh access token:', data.access_token);
        dispatch(setAccessToken(data.access_token));
        const res = await dispatch(fetchMe());
        return res.data;
      } catch {
        // not logged in, ignore
        dispatch(setAccessToken(null));
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [dispatch]);

  if (loading) return <PageLoader />;

  return children;
}
